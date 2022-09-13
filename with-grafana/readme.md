grenton - grafana stats
1. install docker-compose on raspberry pi - https://www.jfrog.com/connect/post/install-docker-compose-on-raspberry-pi/
2. copy docker-compose.yml file from this repo into rpi and run `docker-compose up -d`
3. docker compose file has a policy to restart always so it will start automatically when rpi will be restarted
4. in grenton create `HttpRequest` object with following properties:
- Host: `192.168.1.101:8086`
- Path: `/write`
- QueryStringParams: `db=smarthome`
- Method: `POST`
- RequestType: `Other`
5. Create script in GATE_HTTP, replace with your own thermometers and brightness sensor values
```
local reqBody = "kitchen_temp,host=Kitchen value="..CLU->Kuchnia_Termometr->Value.."\nliving_temp,host=Living value="..CLU->Salon_Termometr->Value.."\noffice_temp,host=Office value="..CLU->Biuro_Termometr->Value.."\ngarage_temp,host=Garage value="..CLU->Garaz_Termometr->Value.."\nhallway_temp,host=Hallway value="..CLU->Korytarz_Dol_Termometr->Value.."\nkitchen_light,host=Kitchen value="..CLU->Kuchnia_Jasnosc->Value.."\nliving_light,host=Living value="..CLU->Salon_Jasnosc->Value.."\noffice_light,host=Office value="..CLU->Biuro_Jasnosc->Value.."\ngarage_light,host=Garage value="..CLU->Garaz_Jasnosc->Value.."\nhallway_light,host=Hallway value="..CLU->Korytarz_Dol_Jasnosc->Value
local qs = "db=smarthome"

GATE_HTTP->InfluxDB->SetRequestBody(reqBody)
GATE_HTTP->InfluxDB->SetQueryStringParams(qs)
GATE_HTTP->InfluxDB->SendRequest()
```
6. Create timer in `GATE_HTTP` that with interval for example 900000 (15minutes) that will trigger the above script
7. Now our data will be sent to influxdb, so we can go to grafana dashboard, eg. `192.168.1.101:3000` and configure it
