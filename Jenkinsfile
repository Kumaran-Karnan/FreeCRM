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
                bat 'npx cucumber-js'
            }
        }

        post {
        always {
            publishHTML([
                // allowMissing: true,
                // alwaysLinkToLastBuild: true,
                // keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'cucumber-report.html',
                reportName: 'Playwright Report'
            ])
        }
    }
}