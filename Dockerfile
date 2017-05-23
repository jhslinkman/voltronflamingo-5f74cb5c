FROM python:2.7.13

WORKDIR /voltronflamingo/

ENV PYTHONPATH /voltronflamingo/
ENV DJANGO_SETTINGS_MODULE voltronflamingo.settings

COPY . /voltronflamingo/

RUN pip install pip==9.0.1
RUN pip install -r /voltronflamingo/requirements.txt
