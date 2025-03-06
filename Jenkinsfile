pipeline {
    agent none
    environment {
        DOCKERHUB_ACCOUNT = 'ashprince'
        STAGE_IMAGE = '${DOCKERHUB_ACCOUNT}/predictor-stage:latest'
        PROD_IMAGE = '${DOCKERHUB_ACCOUNT}/predictor-prod:latest'
    }
    stages {
        stage('Testing deployment') {
            agent { label 'test' }
            steps {
                sh '''
                    rm -rf smart-health-predictor
                    git clone --branch deployment https://github.com/FonsahPageo/smart-health-predictor.git

                    docker stop $(docker ps -aq) 2>/dev/null || true
                    docker rm $(docker ps -aq) 2>/dev/null || true
                    docker rmi $(docker images -q) 2>/dev/null || true
                    docker system prune -a --volumes -f
                '''
            }
        }
        // stage('Manual Approval') {
        //     agent { label 'test' }
        //     steps {
        //         input message: 'Approve deployment to staging server?', ok: 'Proceed'
        //     }
        // }
        stage('Copy code to staging server') {
            agent { label 'test' }
            steps {
                withCredentials([string(credentialsId: 'github_token', variable: 'GITHUB_TOKEN')]) {
                    sh '''
                        rm -rf smart-health-deploy
                        git clone https://github.com/FonsahPageo/smart-health-deploy.git
                        rm -rf smart-health-predictor/.git
                        cp -R smart-health-predictor/* smart-health-deploy/
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
        stage('Staging deployment'){
            agent { label 'stage'}
            steps{
                withCredentials([string(credentialsId: 'github_token', variable: 'GITHUB_TOKEN')]) {
                    sh '''
                        rm -rf smart-health-deploy
                        git clone https://github.com/FonsahPageo/smart-health-deploy.git
                        cd smart-health-deploy
                        docker build -t ${STAGE_IMAGE} .
                        docker push ${STAGE_IMAGE}
                        kubectl delete all --all
                        kubectl apply -f deployment.yaml
                    '''
                }
            }
        }
        stage('Production deployment') {
            agent { label 'prod' }
            steps {
                withCredentials([string(credentialsId: 'github_token', variable: 'GITHUB_TOKEN')]) {
                    sh '''
                        rm -rf smart-health-deploy
                        git clone --branch main https://FonsahPageo:$GITHUB_TOKEN@github.com/FonsahPageo/smart-health-deploy.git
                        cd smart-health-deploy
                        docker build -t ${PROD_IMAGE} .
                        docker push ${PROD_IMAGE}
                        kubectl delete all --all
                        kubectl apply -f deployment.yaml
                    '''
                }
            }
        }
    }
}
