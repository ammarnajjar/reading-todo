FROM jekyll/jekyll as build-env

WORKDIR /docs
COPY Gemfile* ./
RUN  bundle install

RUN mkdir _site
RUN chmod 777 _site
COPY . .
RUN chmod 777 /docs/Dockerfile
RUN bundle exec jekyll build -b ''

FROM nginx:alpine
COPY --from=build-env /docs/_site /usr/share/nginx/html
