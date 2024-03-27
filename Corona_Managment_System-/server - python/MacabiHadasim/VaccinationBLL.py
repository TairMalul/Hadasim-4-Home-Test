from pymongo import MongoClient
from membersBLL import MembersBLL
from Validators import Validators

class Vaccination:

    def __init__(self):
        self.__mongoClient = MongoClient(port=27017)
        self.__db = self.__mongoClient["macabiHadasim4"]

    def get_all_vaccinations(self):
        data = []
        listVaccination = self.__db.Vaccinations.find({})
        for c in listVaccination:
            data.append(c)
        return data

    def get_by_id(self, patient_id):
        data = []
        vaccination = self.__db.Vaccinations.find({'patient_id': patient_id})
        for c in vaccination:
            data.append(c)
        return data

    def add_vaccination(self, obj):
        data = {"patient_id": obj.json['patient_id'],
                "dose_number": obj.json['dose_number'],
                "date": obj.json['date'],
                "manufacturer": obj.json['manufacturer']}
        if Validators.is_date(obj.json['date'])==False:
            return "invalid date"
        #ווידוא שחבר הקופה קיים
        var=MembersBLL().get_member_by_id(obj.json['patient_id'])
        if(var.get('id')==obj.json['patient_id']):
            return self.__db.Vaccinations.insert_one(data)
        return "member not found"

    def update_vaccination(self, obj):
        data = {"patient_id": obj.json['patient_id'],
                "dose_number": obj.json['dose_number'],
                "date": obj.json['date'],
                "manufacturer": obj.json['manufacturer']}
        new_values = {"$set": data}
        #תקינות תאריך
        if Validators.is_date(obj.json['date'])==False:
            return "invalid date"
        return self.__db.Vaccinations.update_one({'id': obj.json['id']}, new_values)

    def delete_vaccination(self, patient_id, dose_number):
        iD = {"patient_id": patient_id, "dose_number": dose_number}
        return self.__db.Vaccinations.delete_one(iD)

    def delete_all_vaccination_of_member(self,patient_id):
        self.__db.Vaccinations.delete_many({"patient_id":patient_id})



