import io
from PIL import Image
from flask import send_file
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from bson import ObjectId
from membersBLL import MembersBLL
from coronaPatientsBLL import CoronaPatientsBLL
from VaccinationBLL import Vaccination

app = Flask(__name__)
CORS(app)

MEMBERS = MembersBLL()
PATIENTS = CoronaPatientsBLL()
VACCINATION = Vaccination()


class MyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super(MyEncoder, self).default(obj)


app.json_encoder = MyEncoder


@app.route('/', methods=['GET'])
def upload():
    return "hye"


# members

@app.route('/members', methods=['GET'])
def get_all_members():
    members = MEMBERS.get_all_members()
    return members


@app.route('/member/<string:id>', methods=['GET'])
def get_member_by_id(id):
    member = MEMBERS.get_member_by_id(id)
    return jsonify(member)


@app.route('/member/add', methods=['POST'])
def add_member():
    var = MEMBERS.add_member(request)
    if var == False:
        return "InValid fields", 400
    return jsonify(var.acknowledged)


@app.route('/member/update', methods=['PUT'])
def update_member():
    var = MEMBERS.update_member(request)
    if var == False:
        return "InValid fields", 400
    return jsonify(var.acknowledged)


@app.route('/member/delete/<string:id>', methods=['DELETE'])
def delete_member(id):
    return jsonify(MEMBERS.delete_member(id).acknowledged)


# corona patients:

@app.route('/corona_patients', methods=['GET'])
def get_all_corona_patients():
    return PATIENTS.get_all_corona_patients()


@app.route('/corona_patients/<string:id>', methods=['GET'])
def get_corona_patient_by_id(id):
    return PATIENTS.get_by_id(id)


@app.route('/corona_patients/add', methods=['POST'])
def add_corona_patient():
    var = PATIENTS.add_corona_patient(request)
    if type(var) == type(""):
        return var, 400
    return jsonify(var.acknowledged)


@app.route('/corona_patients/update', methods=['PUT'])
def update_corona_patient():
    var = PATIENTS.update_corona_patient(request)
    if type(var) == type(""):
        return var, 400
    return jsonify(var.acknowledged)


@app.route('/corona_patients/delete/<string:id>', methods=['DELETE'])
def delete_corona_patient(id):
    return jsonify(PATIENTS.delete_corona_patient(id).acknowledged)


# vaccinations

@app.route('/vaccinations', methods=['GET'])
def get_all_vaccinations():
    return VACCINATION.get_all_vaccinations()


@app.route('/vaccinations/<string:id>', methods=['GET'])
def get_vaccinations_by_id(id):
    return VACCINATION.get_by_id(id)


@app.route('/vaccinations/add', methods=['POST'])
def add_vaccination():
    var = VACCINATION.add_vaccination(request)
    if type(var) == type(""):
        return var, 400
    return jsonify(var.acknowledged)


@app.route('/vaccinations/update', methods=['PUT'])
def update_vaccination():
    var = VACCINATION.add_vaccination(request)
    if type(var) == type(""):
        return var, 400
    return jsonify(var.acknowledged)


@app.route('/vaccinations/delete/<string:id>/<string:dose_number>', methods=['DELETE'])
def delete_vaccination(id, dose_number):
    return jsonify(VACCINATION.delete_vaccination(id, dose_number))


@app.route('/vaccinations/delete_all/<string:id>', methods=['DELETE'])
def delete_all_vaccination_of_member(id):
    return jsonify(VACCINATION.delete_all_vaccination_of_member(id))


# images
@app.route("/get-image/<string:id>", methods=['GET'])
def get_image(id):
    return send_file('photos\\' + id + ".png", as_attachment=True)


@app.route("/member_1/upload_image/<string:id>", methods=['POST'])
def upload_image_to_member(id):
    # check if the post request has the file part
    if 'file' not in request.files:
        print('no file in request')
        return ""
    file = request.files['file']
    if file.filename == '':
        print('no selected file')
        return ""
    if file:  # and allowed_file(file.filename):
        img = Image.open(file)
        img.save("photos/" + id + ".png")
    return jsonify(True)


app.run(debug=True)
