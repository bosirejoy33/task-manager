# Use an official lightweight web server image
FROM nginx:alpine

# Copy static files to Nginx web directory
COPY public/ /usr/share/nginx/html

# Expose port 80 so we can access the app
EXPOSE 80

# Default command runs Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
