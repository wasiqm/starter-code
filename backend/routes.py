from flask import Blueprint
from flask import jsonify

from .db import client as db_client

blueprint = Blueprint('api', __name__)


@blueprint.route('/recycling-data')
def get_recycling_data():
    data = [row.to_dict() for row in db_client.get_all_recycling_data()]
    return jsonify(data)

# Params: None
# Returns: Score Record Object
@blueprint.route('/scores')
def get_scores_by_class():

    bonus_items = [
        'batteries', 
        'computer_parts'
    ]
    bonus_items_times10 = [
        'vibranium'
    ]
    meta_fields = [
        'teacher', 
        'id'
    ]

    data = [row.to_dict() for row in db_client.get_all_recycling_data()]
    classes = {}

    for record in data:
        score = 0
        teacher = record['teacher']
        for field in record: 
            if field not in meta_fields: 
                if field in bonus_items:
                    score += 2*record[field]
                elif field in bonus_items_times10:
                    score += 10*record[field]
                else: 
                    score += record[field]

        if teacher in classes: classes[teacher] += score
        else: classes[teacher] = score

    return jsonify(classes)