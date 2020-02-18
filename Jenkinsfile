pipeline {
    agent {
        docker {
            image 'node:10-alpine'
            args '-p 3000:3000'
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
                echo 'Deploy job is selected'
            }
        }
    }
}