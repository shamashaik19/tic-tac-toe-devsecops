pipeline {
    agent any

    environment {
        SONAR_SCANNER_HOME = tool 'SonarQubeScanner'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/shamashaik19/tic-tac-toe-devsecops.git'
            }
        }

        stage('SonarQube Code Scan') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                    ${SONAR_SCANNER_HOME}/bin/sonar-scanner
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t tic-tac-toe:latest .'
            }
        }

        stage('Trivy Image Scan') {
            steps {
                sh 'trivy image tic-tac-toe:latest'
            }
        }

        stage('Deploy App') {
            steps {
                sh '''
                docker run -d -p 80:80 --name tic-tac-toe tic-tac-toe:latest
                '''
            }
        }
    }
}

