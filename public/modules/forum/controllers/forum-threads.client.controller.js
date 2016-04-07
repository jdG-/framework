'use strict';

// Forum threads controller
angular.module('forum').controller('ForumThreadsController', ['$scope', '$stateParams', '$location', '$http', 'Authentication', 'ForumThreads', 'ForumReplies',
	function($scope, $stateParams, $location, $http, Authentication, ForumThreads, ForumReplies) {
		$scope.authentication = Authentication;

        if (Authentication.user === '' || Authentication.user === undefined || Authentication.user === null) {
            $location.path('/signin');
        }

		// Create new Forum thread
		$scope.create = function() {
			// Create new Forum thread object

			var forumThread = new ForumThreads ({
				name: this.name,
                categoryId: $stateParams.categoryId
			});

			// Redirect after save
            var log = {
                user: Authentication.user._id,
                action: 'create a thread on: ' + $location.path()
            };

            $http.post('/logs-list', log).success(function () {
                forumThread.$save(function (response) {
                    $location.path('forum-threads/' + response._id);

                    // Clear form fields
                    $scope.name = '';
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            });
		};

		// Remove existing Forum thread
		$scope.remove = function(forumThread) {
            var log = {
                user: Authentication.user._id,
                action: 'delete a thread on: ' + $location.path()
            };

            $http.post('/logs-list', log).success(function () {
                if (forumThread) {
                    forumThread.$remove();

                    for (var i in $scope.forumThreads) {
                        if ($scope.forumThreads [i] === forumThread) {
                            $scope.forumThreads.splice(i, 1);
                        }
                    }
                } else {
                    $scope.forumThread.$remove(function () {
                        $location.path('forum-threads');
                    });
                }
            });
		};

		// Update existing Forum thread
		$scope.update = function() {
			var forumThread = $scope.forumThread;

            var log = {
                user: Authentication.user._id,
                action: 'update a thread on: ' + $location.path()
            };

            $http.post('/logs-list', log).success(function () {
                forumThread.$update(function () {
                    $location.path('forum-threads/' + forumThread._id);
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            });
		};

		// Find a list of Forum threads
		$scope.find = function() {
            var log = {
                user: Authentication.user._id,
                action: 'list of threads on: ' + $location.path()
            };

            $http.post('/logs-list', log).success(function () {
                $scope.forumThreads = ForumThreads.query();
            });
		};

		// Find existing Forum thread
		$scope.findOne = function() {
            var log = {
                user: Authentication.user._id,
                action: 'view a thread on: ' + $location.path()
            };

            $http.post('/logs-list', log).success(function () {
                $scope.forumThread = ForumThreads.get({
                    forumThreadId: $stateParams.forumThreadId
                });
            });
		};

		$scope.replyThread = function() {
			if ($scope.contentForm.content.$viewValue !== '' && $scope.contentForm.content.$viewValue !== undefined) {
				var forumReply = new ForumReplies({
					content: $scope.content,
					thread: $stateParams.forumThreadId,
					category: $scope.forumThread.categoryId
				});

                var log = {
                    user: Authentication.user._id,
                    action: 'reply to a thread on: ' + $location.path()
                };

                $http.post('/logs-list', log).success(function () {
                    forumReply.$save(function (response) {
                        response.user = Authentication.user;
                        $scope.forumThread.replies.push(response);
                        // Clear form fields
                        $scope.content = '';

                    }, function (errorResponse) {
                        $scope.error = errorResponse.data.message;
                    });
                });
			}
		};

		$scope.commentReply = function (reply) {

			if (reply.commentContent !== undefined) {
				var commentReply = new ForumReplies({
					content: reply.commentContent,
					replyId: reply._id,
                    thread: $stateParams.forumThreadId,
					category: $scope.forumThread.categoryId,
                    isComment: true
				});

                var log = {
                    user: Authentication.user._id,
                    action: 'comment a reply on: ' + $location.path()
                };

                $http.post('/logs-list', log).success(function () {
                    $http.post('/forum-replies/' + $stateParams.forumThreadId, commentReply).success(function (res) {
                        res.user = Authentication.user;
                        for (var i in $scope.forumThread.replies) {
                            if ($scope.forumThread.replies[i]._id === reply._id) {
                                $scope.forumThread.replies[i].comments.push(res);
                            }
                        }
                        reply.commentContent = '';
                    }).error(function (err) {
                        $scope.error = err;
                    });
                });
			}
		};
	}
]);
