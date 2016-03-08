( function (angular, _) {
    "use strict";

    angular.module("emr.common.controllers.patientBanner", [
        "ngFileUpload",
        "emr.common.services",
        "emr.common.services.imageUploads",
        "emr.resources.visits.allergyIntolerance",
        "emr.common.resourceUtilities"
    ])

    .controller("emr.common.patientBannerLoader",
        ["$scope", "emr.resource.linkPatients", "$state",
        "emr.common.dateOfBirthToAge", "emr.common.services.upload",
        "END_POINT_USER_PHOTO", "errorMessage", "emr.resource.triage",
        "emr.common.bmi", "emr.resource.allergyIntolerance", "emr.imageValidator",
        "emr.webcamStarter", "$modal", "$rootScope",
        function ($scope, linker, $state, convert, photoService, endPoint, alert,
            triage, bmiConvertor, allergy, imageService, webcamService, $modal) {
            var patientID = $state.params.patientID;
            var personID = $state.params.personID;
            var defaultPhoto = "../assets/img/blue_guy.png";

            $scope.patientID = patientID;
            $scope.personID = personID;
            $scope.uploadPhoto = false;
            $scope.fileNotSelected = true;
            $scope.streamWebcam = false;
            $scope.last_registration_state = "patients.registration.contact";
            $scope.registration_complete = true;

            $scope.displayPatientBanner = function () {
                // get all the information pertaining a patient
                // display it to the patient banner
                linker.patient.find(patientID).then(function (data) {
                    var d = data;
                    var dateOfBirth = d.person_details.date_of_birth;
                    $scope.patient = d;
                    $scope.age = convert.getAge(dateOfBirth);
                    $scope.patientId = d.patient_id_pretty;
                    $scope.firstName = d.person_details.first_name;
                    $scope.lastName = d.person_details.last_name;
                    $scope.registration_complete = d.registration_complete;
                    $scope.last_registration_state = d.last_registration_state;
                    var gender = d.person_details.gender_name;
                    if (!gender) {
                        $scope.gender = "Unknown";
                    } else {
                        $scope.gender = gender;
                    }

                    // check if an image exists for this patient and load it
                    // fallback to a default photo if none exists
                    var imgArray = d.person_details.personphoto_set;
                    $scope.image = _.isEmpty(imgArray) ?
                    defaultPhoto : d.person_details.personphoto_set[0].data;

                    $scope.contacts = d.person_details.contact_set.length;

                    if ($scope.contacts > 1) {
                        // if more than one contact is present for this patient
                        // bind a scope array and filter in the UI
                        // see `common/tpls/views/patient_summary.tpl.html`
                        $scope.contact = d.person_details.contact_set;
                        $scope.manyContacts = true;

                    } else {
                        // if only one contact exists
                        // only show one contact in the patient banner
                        $scope.oneContact = true;
                        var contactArray = d.person_details.contact_set[0];
                        if (_.has(contactArray, "contact")) {
                            $scope.contact = contactArray.contact;
                        }
                        else {
                            $scope.contact = "NULL";
                        }
                    }
                });
            };

            // image cropper properties (angular-img-cropper directive)
            // applied as a directive
            // see `common/tpls/views/patient_summary.tpl.html`
            $scope.cropper = {};
            $scope.cropper.sourceImage = null;
            $scope.cropper.croppedImage = null;
            $scope.bounds = {};
            $scope.bounds.left = 0;
            $scope.bounds.right = 0;
            $scope.bounds.top = 0;
            $scope.bounds.bottom = 0;

            $scope.fileNameChanged = function (files) {
                // enable the `upload photo` button only
                // when there is a file selected
                $scope.streamWebcam = false;
                $scope.fileNotSelected = false;
                $scope.file = files;
                $scope.uploadComplete = false;
                $scope.showImage = false;
                $scope.enableUploadBtn = true;
            };

            // Fire the webcam
            var videoElement = null;
            $scope.showDemos = false;
            $scope.videoAttributes = {h: 240, w: 320, x: 0, y: 0};

            // Setup a channel to receive a video property
            // with a reference to the video element
            // see `image_multistep.tpl.html` (<webcam channel='channel'>)
            $scope.channel = {
                video: {
                    height: 240,
                    width: 320
                }
            };

            // incase an error occurs when using the
            // webcam, bind it to some scope variable
            // see `image_multistep.tpl.html` (<webcam on-error='onError(err);'>)
            $scope.webcamError = false;
            $scope.onError = function (err) {
                $scope.$apply(function() {
                    $scope.webcamError = err;
                    $scope.startWebcam = false;
                    $scope.alert = alert.showError(err.message, err.name);
                });
            };

            // if everything is successfull, i.e the browser
            // supports the RTC API (getUserMedia())
            // see `image_multistep.tpl.html` (<webcam on-streaming='onSuccess();'>)
            $scope.onSuccess = function () {
                // The video element contains the captured camera data
                videoElement = $scope.channel.video;
                $scope.$apply(function() {
                    $scope.videoAttributes.w = videoElement.width;
                    $scope.videoAttributes.h = videoElement.height;
                    $scope.showDemos = true;
                });
            };

            $scope.openWebcam = function () {
                // fire up the webcam
                $scope.streamWebcam = true;
                $scope.showImage = false;
                // toggle the filepicker display area
                $scope.fileNotSelected = true;
                $scope.enableUploadBtn = false;

            };

            $scope.takeSnapshot = function () {
                $scope.cropper.croppedImage = null;
                var canvasID = "#captureLiveImage";

                var webcamInstance = webcamService.startWebcam(canvasID,
                    $scope.videoAttributes, videoElement);

                $scope.showImage = webcamInstance.showImage;
                $scope.imgBase64 = webcamInstance.dataURI;
                $scope.enableUploadBtn = true;
                $scope.streamWebcam = false;
                $scope.fileNotSelected = true;
                //  get image type
                $scope.imageType = webcamInstance.type;

                //  get image size in bytes
                $scope.imgSize = webcamInstance.size;

            };

            $scope.updatePatientImage = function () {
                var dataURI, lastModified, contentType, size, extension, fileName,
                file;
                // check to see if the
                if ($scope.cropper.croppedImage === null) {
                    // photo taken using the webcam
                    dataURI = $scope.imgBase64;
                    contentType = $scope.imageType;
                    size = $scope.imgSize;

                    lastModified = String(new Date().getTime());

                    extension = "." + contentType.split("/")[1];

                    fileName = patientID + lastModified + extension;

                    file = photoService.base64ToFileObj(dataURI, fileName,
                        contentType);
                } else {
                    // photo uploaded as a file
                    var splitImgName = $scope.file[0].name.split(".");
                    var length = splitImgName.length;
                    dataURI = $scope.cropper.croppedImage;
                    lastModified = String($scope.file[0].lastModified);
                    extension = "." + splitImgName[length - 1];
                    fileName = patientID + lastModified + extension;
                    contentType = $scope.file[0].type.toLowerCase();

                    file = photoService.base64ToFileObj(dataURI, fileName,
                        contentType);
                    size = file.size;
                }

                // check if the image file type and size are accepted for upload
                var isImageValid = imageService.validateImage(contentType, size);
                if (isImageValid) {
                    // image is valid i.e.
                    // image in less than 1MB and is of the type jpeg, jpg or png
                    var photo = {
                        active: true,
                        data: file,
                        name: fileName,
                        person: personID
                    };
                    photoService.uploadPhoto(photo.data, photo, endPoint)
                    .then(function (data) {
                        $scope.uploaded = data;
                        $scope.image = data.data;
                        $scope.uploadPhoto = false;
                        $scope.alert = alert.showSuccess(
                            "Patient image has been updated successfully.",
                            "Success");
                        $scope.initializePhotoUpdate = false;
                        $scope.$dismiss();
                    });
                } else {
                    // image is invalid i.e
                    // either the image size is greater than 1MB or the image type
                    // is not jpeg, jpg or png
                    var humanSize = ((size * 1.0) / 1000000).toFixed(2);
                    var message = "Image size must be less than 1MB. You tried " +
                    "uploading " + humanSize + "MB.";
                    $scope.alert = alert.showError(message, "ImageError");
                }
            };

            $scope.launchModal = function () {
                var loc = "common/tpls/patient_photo_modal.tpl.html";
                $scope.initializePhotoUpdate = true;
                $scope.modalInstance = $modal.open({
                    animation: true,
                    controller: "emr.common.patientBannerLoader",
                    resolve: {},
                    templateUrl: loc
                });
            };

            $scope.loadVitals = function () {
                // get the patient's vitals and
                // display them to the banner
                var params = {
                    patient: patientID
                };
                $scope.loaded = false;
                triage.findAll(params, { bypassCache: true }).then(
                    function (triage) {
                        if (triage.length > 0) {
                            $scope.presentVitals = triage;
                            // Just show the most current vitals recorded.
                        } else {
                            // fallback when no vitals are present
                            $scope.vitals = "Patient has no vitals details.";
                        }
                        $scope.loaded = true;
                    }
                );
            };

            $scope.loadAllergies = function () {
                // get all allergies associated with a patient
                var params = {
                    patient: patientID
                };

                $scope.loaded = false;
                allergy.findAll(params, { bypassCache: true }).then(
                    function (allergy) {
                    var allergyLen;
                    // Show the first 6 if patient has more on the banner
                    if (allergy.length > 0 ) {
                        $scope.presentAllergies = allergy;
                        // Show how many more allergies the patient has
                        if (allergy.length > 6 ) {
                            allergyLen = allergy.length - 6;
                            $scope.moreAllergies = allergyLen;
                        }
                    } else {
                        // Fallback when patient has no known allergies
                        $scope.allergy = "Patient has no known allergies.";
                    }
                    $scope.loaded = true;
                });
            };
        }
    ]);
}) (angular, _);
