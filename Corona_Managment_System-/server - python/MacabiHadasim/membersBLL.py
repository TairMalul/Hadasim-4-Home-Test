import io
from PIL import Image
from pymongo import MongoClient
from Validators import Validators

class MembersBLL:

    def __init__(self):
        self.__mongoClient = MongoClient(port=27017)
        self.__db = self.__mongoClient["macabiHadasim4"]

    def get_all_members(self):
        members = []
        listMembers = self.__db.members.find({})
        for m in listMembers:
            members.append(m)
        return members

    def get_member_by_id(self, id):
        member = self.__db.members.find_one({'id': id})
        return member

    def add_member(self, obj):
        member = {"id": obj.json['id'],
                  "first_name": obj.json['first_name'],
                  "last_name": obj.json['last_name'],
                  "address": obj.json['address'],
                  "phone_number": obj.json['phone_number'],
                  "mobile_phone": obj.json['mobile_phone']}
        if self.valid_member(obj)==False:
            return False
        return self.__db.members.insert_one(member)

    def update_member(self, obj):
        member = {"id": obj.json['id'],
                  "first_name": obj.json['first_name'],
                  "last_name": obj.json['last_name'],
                  "address": obj.json['address'],
                  "phone_number": obj.json['phone_number'],
                  "mobile_phone": obj.json['mobile_phone'], }
        new_values = {"$set": member}
        if self.valid_member(obj)==False:
            return False
        return self.__db.members.update_one({'id': obj.json['id']}, new_values)

    def delete_member(self, id):
        iD = {"id": id}
        return self.__db.members.delete_one(iD)

#validation checks
    def valid_member(self,obj):
        if Validators.validId(obj.json['id'])==False:
            return False
        if Validators.validName(obj.json['first_name'])==False:
            return False
        if Validators.validName(obj.json['last_name'])==False:
            return False
        if Validators.validAddress(obj.json['address'])==False:
            return False
        if Validators.validPhoneNumber(obj.json['phone_number'])==False:
            return False
        return Validators.validPhoneNumber(obj.json['mobile_phone'])