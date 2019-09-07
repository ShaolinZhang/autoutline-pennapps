FROM continuumio/miniconda3
WORKDIR "/app"
COPY ./environment.yaml ./
RUN conda create -f environment.yaml
RUN conda activate pennapps
COPY ./ ./
CMD ["python", "api_serv.py"]
