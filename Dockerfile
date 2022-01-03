FROM node
WORKDIR /home/githubprofile
COPY . .
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]