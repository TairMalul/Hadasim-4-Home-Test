from pymongo import MongoClient
from xxlimited import Null
import membersBLL
from Validators import Validators

class CoronaPatientsBLL:

    def __init__(self):
        self.__mongoClient = MongoClient(port=27017)
        self.__db = self.__mongoClient["macabiHadasim4"]

    def get_all_corona_patients(self):
        data = []
        listCoronaPatients = self.__db.corona_patient.find({})
        for c in listCoronaPatients:
            data.append(c)
        return data

    def get_by_id(self, id):
        member = self.__db.corona_patient.find_one({'id': id})
        if member == None or member == Null:
            member = {}
        return member

    def add_corona_patient(self, obj):
        data = {"id": obj.json['id'],
                "diagnose_date": obj.json['diagnose_date'],
                "recovery_date": obj.json['recovery_date']}
        #תקינות תאריכים
        if Validators.is_date(obj.json['diagnose_date'])==False:
            return "invalid date"
        if Validators.is_date(obj.json['recovery_date'])==False:
            return "invalid date"
        #בדיקה האם משתמש קיים
        var = membersBLL.MembersBLL().get_member_by_id(obj.json['id'])
        if (var.get('id') == obj.json['id']):
            return self.__db.corona_patient.insert_one(data)
        return "Member do not exist"


    def update_corona_patient(self, obj):
        data = {"id": obj.json['id'],
                "diagnose_date": obj.json['diagnose_date'],
                "recovery_date": obj.json['recovery_date']}
        new_values = {"$set": data}
        # תקינות תאריכים
        if Validators.is_date(obj.json['diagnose_date']) == False:
            return "invalid date"
        if Validators.is_date(obj.json['recovery_date']) == False:
            return "invalid date"
        return self.__db.corona_patient.update_one({'id': obj.json['id']}, new_values)

    def delete_corona_patient(self, id):
        iD = {"id": id}
        return self.__db.corona_patient.delete_one(iD)

