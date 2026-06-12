pipeline {

    agent any

    tools {
        nodejs 'Node20'
    }

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run FreeCRM Test') {
            steps {
                bat 'npx playwright test FreeCRM.spec.ts'
            }
        }
    }
}