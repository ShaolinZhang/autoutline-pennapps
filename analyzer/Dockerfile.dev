FROM continuumio/miniconda:4.7.10
RUN conda init
WORKDIR "/app"
COPY ./environment.yml ./
RUN conda env create -f environment.yml
COPY ./ ./
CMD ["conda", "run", "-n", "analyzer", "python", "api_serv.py"]
