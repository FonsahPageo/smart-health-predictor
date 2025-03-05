pipeline {
    agent none
    environment {
        DOCKERHUB_ACCOUNT = 'ashprince'
        STAGE_IMAGE = '${DOCKERHUB_ACCOUNT}/predictor-stage:latest'
        PROD_IMAGE = '${DOCKERHUB_ACCOUNT}/predictor-prod:latest'
    }
    stages {
        stage('Docker Login') {
            agent { label 'built-in' }
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh 'echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USER" --password-stdin'
                }
            }
        }
        stage ('Check for docker on agent'){
            agent { label 'test'}
            steps{
                sh 'echo docker --version'
                sh 'echo which docker'
            }
        }
        stage('Testing Environment - Build & Test') {
            agent { label 'test' }
            steps {
                sh 'rm -rf smart-health-predictor'
                echo 'Cloning GitHub for testing...'
                sh 'git clone https://github.com/FonsahPageo/smart-health-predictor.git'

                sh 'cd smart-health-predictor'

                sh '''
                        if [ "$(docker ps -aq)" ]; then
                            docker stop $(docker ps -aq)
                        fi
                    '''
                sh '''
                        if [ "$(docker ps -aq)" ]; then
                            docker rm $(docker ps -aq)
                        fi
                    '''
                sh '''
                        if [ "$(docker images -q)" ]; then
                            docker rmi $(docker images -q)
                        fi
                    '''
                sh 'docker system prune -a --volumes -f'

                sh 'docker build -t ashprince/predictor-test:latest -f Dockerfile .'
                
                echo 'Deploying test environment with Docker Compose...'
                sh 'docker-compose -f docker-compose.yaml up -d'
            }
        }
        stage('Manual Approval') {
            agent { label 'test' }
            steps {
                input message: 'Approve deployment to staging server?', ok: 'Proceed'
            }
        }
        stage('Staging Deployment') {
            agent { label 'stage' }
            steps {
                echo 'Copying code to deploy repository and building staging images...'
                withCredentials([usernamePassword(credentialsId: 'github', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')]) {
                    sh '''
                    rm -rf smart-health-deploy
                    git clone https://$GIT_USER:$GIT_PASS@github.com/FonsahPageo/smart-health-deploy.git
                    rm -rf smart-health-predictor/.git
                    cp -R smart-health-predictor/* smart-health-deploy/
                    cd smart-health-deploy
                    git config user.email "ashprincepageo@gmail.com"
                    git config user.name "FonsahPageo"
                    git add .
                    git commit -m "Staging deployment update"
                    git push origin master
                    '''
                }
                sh 'docker build -t ${STAGE_IMAGE} smart-health-deploy'
                
                echo 'Pushing staging images to DockerHub...'
                sh 'docker push ${STAGE_IMAGE}'
            }
        }
        stage('Staging'){
            agent { label 'stage'}
            steps{
                echo 'Deploying staging containers using Kubernetes...'
                sh 'kubectl apply -f kubernetes/staging-deployment.yaml'
            }
        }
        // stage('Production Build') {
        //     agent { label 'prod' }
        //     steps {
        //         echo "Pushing code to stakeholder's repository and building production images..."
        //         sh '''
        //           cd Motinatech-Deploy
        //           git remote add stakeholder https://github.com/stakeholder/repository.git || true
        //           git push stakeholder master
        //         '''
        //         sh 'docker build -t ${FRONTEND_IMAGE_PROD} Motinatech-Deploy/frontend'
        //         // sh 'docker build -t ${BACKEND_IMAGE_PROD} Motinatech-Deploy/backend'
                
        //         echo 'Pushing production images to DockerHub...'
        //         sh 'docker push ${FRONTEND_IMAGE_PROD}'
        //         // sh 'docker push ${BACKEND_IMAGE_PROD}'
        //     }
        // }
        // stage('Production Deployment') {
        //     agent { label 'prod' }
        //     steps {
        //         echo 'Pulling production images and deploying production containers...'
        //         sh 'docker pull ${FRONTEND_IMAGE_PROD}'
        //         sh 'docker pull ${BACKEND_IMAGE_PROD}'
        //         sh 'docker-compose -f docker-compose.prod.yml up -d'
        //     }
        // }
    }
}
