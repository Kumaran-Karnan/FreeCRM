pipeline {

    agent any

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
                bat 'npx playwright test'
            }
        }

        post {
        always {
            publishHTML([
                // allowMissing: true,
                // alwaysLinkToLastBuild: true,
                // keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
        }
    }
}