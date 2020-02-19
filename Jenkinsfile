pipeline {
    agent {
        docker {
            image 'node:10-alpine'
        }
    }

    environment {
        CI = 'true'
        NODE_ENV = 'production'
        RANDOM_VAR = 'Random variable'
    }

    parameters {
        choice(
            name: 'JOB', 
            choices: ['Test', 'Deploy'], 
            description: 'Select the job your want to run.'
        )
        choice(
            name: 'STG', 
            choices: ['stg-1', 'stg-2', 'stg-3'],
            description: 'Select staging you want to deploy to'
        )
    }

    triggers {
        pollSCM('* * * * *')
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                retry(3) {
                    sh './scripts/test.sh'
                }
            }

            post {
                success {
                    echo 'All tests passed'
                }

                failure {
                    echo 'Tests failed'
                }
            }
        }

        stage('Only on development') {
            when {
                branch 'development'
            }

            input {
                message "Select one of the following"
                parameters {
                    choice(
                        name: 'TYPE', 
                        choices: ['foo', 'bar'],
                        description: 'Select one of the following'
                    )
                }
            }

            stages {
                stage('Runs only when foo is selected') {
                    when {
                        expression {
                            params.TYPE == 'foo'
                        }
                    }
                    
                    steps {
                        echo 'This runs when foo is selected'
                    }
                }

                stage('Runs only when bar is selected') {
                    when {
                        expression {
                            params.TYPE == 'bar'
                        }
                    }

                    steps {
                        echo 'This runs when bar is selected'
                    }
                }
            }
        }

        stage('When Test job selected') {
            when {
                expression {
                    params.JOB == 'Test'
                }
            }

            steps {
                echo 'Test job is selected'
            }
        }

        stage('When Deploy job selected') {
            when {
                expression {
                    params.JOB == 'Deploy'
                }
            }

            steps {
                sh './scripts/deploy.sh'
            }
        }
    }
}