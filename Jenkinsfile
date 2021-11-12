pipeline {
    agent any
    triggers {
        githubPush()
    }
    environment {
        MONGODB_ENV_URI=''
        NODE_ENV='test'
    }
      stages {
          stage('build') {
              steps {
                  echo 'Starting build and installing packages'
                  sh 'npm install'
              }
          }
          stage('test') {
              steps {
                  echo 'Running tests'
                  sh 'npm test'
              }
          }
          stage('coverage') {
              steps {
                  echo 'Checking the code coverage'
                  sh 'npm run coverage'
              }
          }
          stage('deploy') {
              steps {
                  echo 'Deploying the software to aws ec2'
                  sh '''#!/bin/bash
                  ssh ubuntu@ip-172-31-89-62 <<EOF
                   cd /var/www/ticketing
                   sudo git reset --hard HEAD
                   sudo git pull
                   npm install
                   pm2 restart all
                   exit
                  EOF

                  '''
          }
      }
    }
}

