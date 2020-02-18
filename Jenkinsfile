pipeline {
    agent {
        docker {
            image 'node:10-alpine'
            args '-p 3000:3000'
        }
    }

    environment {
        CI = 'true'
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
    }
}