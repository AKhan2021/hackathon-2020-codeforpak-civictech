import { ServiceChargeModel } from "../models/ServiceChargeModel";
import { processPayment } from "../services/PaymentService";
import express from "express";
import { ServiceChargeResponse } from "../models/ServiceChargeResponse";
import { ServiceChargeRequest } from "models/ServiceChargeRequest";
import { ServiceType } from "models/ServiceType";
import { ResidentType } from "models/ResidentType";
import { ServiceCharge } from "models/ServiceCharge";

const ServiceChargesRouter = express.Router();

ServiceChargesRouter.post("/pay", processServiceChargePayment);
ServiceChargesRouter.get("/", getServiceCharges);
ServiceChargesRouter.get("/create-request", createServiceChargeRequest);

export { ServiceChargesRouter };

async function createServiceChargeRequest(
  req: express.Request, 
  res: express.Response) 
{
  const serviceChargeRequest: ServiceChargeRequest = {
      amount: req.body.amount,
      request_date: req.body.request_date,
      debit_party: {
        name: req.body.debit_party.name,
        phone: req.body.debit_party.phone,
        account_number:  req.body.debit_party.account_number,
      },
      credit_party: {
        name: "The Muzafrabad Government",
        phone: "0313" + Math.floor(Math.random() * 10000000),
        account_number: Math.floor(Math.random() * 1000000000).toString(),
      },
      service_type: ServiceType.WASTE_COLLECTION,
      resident: {
        type: ResidentType.INDIVIDUAL,
        given_names: req.body.resident.given_names,
        last_name: req.body.resident.last_name,
        phone: req.body.resident.phone,
        cnic:  req.body.resident.cnic,
        address: req.body.resident.address,
      },
    }

    const serviceCharge : ServiceCharge = {
      request: serviceChargeRequest
    }

    const serviceChargeModel = new ServiceChargeModel(serviceCharge);
    serviceChargeModel.save();
    res.send("Service Charge Request created : " + serviceChargeRequest);
}

async function getServiceCharges(req: express.Request, res: express.Response) {
  const query = new Parse.Query("ServiceCharge");
  query
    .find()
    .then(function(results) {
      console.log(`Fetched service charges from DB: ${results}`);
      res.send(results);
    })
    .catch(function(error) {
      console.log("Error: " + error.code + " " + error.message);
      res.send("User Found");
    });
}

async function processServiceChargePayment(
  req: express.Request,
  res: express.Response
) {
  const serviceChargeRequest: ServiceChargeRequest = req.body.serviceChargeRequest;
  if (serviceChargeRequest === undefined) {
    res.send("Service charge payment payload was invalid.");
  }
  const serviceChargeResponse: ServiceChargeResponse = await processPayment(
    serviceChargeRequest
  );
  const serviceChargeModel = new ServiceChargeModel({
    request: serviceChargeRequest,
    response: serviceChargeResponse,
  });

  serviceChargeModel
    .save()
    .then((serviceCharge: any) => {
      console.log(
        `Service charge model successfully created: ${serviceCharge}`
      );
      res.send(`Service charge model successfully created: ${serviceCharge}`);
    })
    .catch((error: any) => {
      console.log("Error: " + error.message);
      res.send("Error when creating user: " + error);
    });
}
