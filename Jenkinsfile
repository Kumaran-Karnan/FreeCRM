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

        stage('Run Tests') {
            steps {
                bat 'npx cucumber-js'
            }
        }
    }

    post {
        always {
            publishHTML([
                reportDir: 'playwright-report',
                reportFiles: 'cucumber-report.html',
                reportName: 'Playwright Report'
            ])
        }
    }
}