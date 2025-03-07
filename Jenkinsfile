pipeline {
    agent none
    environment {
        DOCKERHUB_ACCOUNT = 'ashprince'
    }
    stages {
        stage('Testing deployment') {
            agent { label 'test' }
            steps {
                sh '''
                    rm -rf smart-health-predictor
                    git clone --branch deployment https://github.com/FonsahPageo/smart-health-predictor.git
                    cd smart-health-predictor

                    docker stop $(docker ps -aq) 2>/dev/null || true
                    docker rm $(docker ps -aq) 2>/dev/null || true
                    docker rmi $(docker images -q) 2>/dev/null || true
                    docker system prune -a --volumes -f

                    docker build -t ashprince/predictor:latest -f predictor/Dockerfile predictor
                    docker-compose -f docker-compose.yaml up -d
                '''
            }
        }
        // stage('SonarQube Analysis') {
        //     agent { label 'sonar' }
        //     def scannerHome = tool 'SonarScanner';
        //     steps {
        //         withSonarQubeEnv('sonar_token') {
        //             sh '''
        //                 sonar-scanner \
        //                   -Dsonar.projectKey=smart-health-predictor \
        //                   -Dsonar.sources=. \
        //                   -Dsonar.host.url=$SONAR_HOST_URL \
        //                   -Dsonar.login=$SONAR_AUTH_TOKEN
        //             '''
        //         }
        //     }
        // }
        // stage('SonarQube Analysis') {
        //     agent { label 'sonar'}
        //     steps {
        //         script {
        //             def scannerHome = tool 'SonarScanner'
        //             withSonarQubeEnv('sonar_token') {
        //                 sh "${scannerHome}/bin/sonar-scanner"
        //             }
        //         }
        //     }
        // }
        stage('Manual Approval to staging') {
            agent { label 'test' }
            steps {
                input message: 'Approve deployment to staging server?', ok: 'Proceed'
            }
        }
        // just a change on the repo
        stage('Copy code to staging server') {
            agent { label 'test' }
            steps {
                withCredentials([string(credentialsId: 'github_token', variable: 'GITHUB_TOKEN')]) {
                    sh '''
                        rm -rf smart-health-deploy
                        git clone https://github.com/FonsahPageo/smart-health-deploy.git
                        rm -rf smart-health-predictor/.git
                        cp -R smart-health-predictor/* smart-health-deploy/
                        rm -rf smart-health-predictor
                        cd smart-health-deploy
                        git config user.email "ashprincepageo@gmail.com"
                        git config user.name "FonsahPageo"
                        git add .
                        git commit -m "Staging deployment update"
                        git push https://FonsahPageo:$GITHUB_TOKEN@github.com/FonsahPageo/smart-health-deploy.git
                    '''
                }
            }
        }
        stage('Staging deployment') {
            agent { label 'stage' }
            steps {
                withCredentials([string(credentialsId: 'github_token', variable: 'GITHUB_TOKEN')]) {
                    sh '''
                        rm -rf smart-health-deploy
                        git clone https://github.com/FonsahPageo/smart-health-deploy.git
                        cd smart-health-deploy
                        
                        docker build -t ashprince/predictor-stage:latest -f predictor/Dockerfile predictor
                        docker push ashprince/predictor-stage:latest
                        
                        kubectl delete all --all || true
                        
                        kustomize build overlays/staging | kubectl apply -f -
                    '''
                }
            }
        }
        stage('Manual Approval to deployment') {
            agent { label 'stage' }
            steps {
                input message: 'Approve deployment to production server?', ok: 'Proceed'
            }
        }
        stage('Production deployment') {
            agent { label 'prod' }
            steps {
                withCredentials([string(credentialsId: 'github_token', variable: 'GITHUB_TOKEN')]) {
                    sh '''
                        rm -rf smart-health-deploy
                        git clone --branch main https://github.com/FonsahPageo/smart-health-deploy.git
                        cd smart-health-deploy
                        
                        docker build -t ashprince/predictor-prod:latest -f predictor/Dockerfile predictor
                        docker push ashprince/predictor-prod:latest
                        
                        kubectl delete all --all || true
                        
                        kustomize build overlays/production | kubectl apply -f -
                    '''
                }
            }
        }
    }
}
