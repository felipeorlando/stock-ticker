# Use the official Ruby image based on Debian.
FROM ruby:3.2.2

RUN apt-get update -qq && apt-get install -y build-essential libsqlite3-dev nodejs yarn

ENV RAILS_ENV=development
ENV RAILS_LOG_TO_STDOUT=true

WORKDIR /app

COPY Gemfile Gemfile.lock ./

RUN bundle install

COPY . .

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
