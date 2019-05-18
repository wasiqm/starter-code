import json
from flask import Blueprint
from flask import jsonify
from flask import request

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
                else: 
                    score += record[field]

        if teacher in classes: classes[teacher] += score
        else: classes[teacher] = score

    return jsonify(classes)

# Params: New Record
# Returns: Score Record Object
@blueprint.route('/new_entry', methods=['POST'])
def add_or_update_new_entry():

    # recycling records
    data = [row.to_dict() for row in db_client.get_all_recycling_data()]

    # incoming post data
    post_data = json.loads(request.args['data'])

    # list of recuclable fields
    categories = [
        k for k in data[0]
    ]
    categories.remove('id')
    categories.remove('teacher')

    # list of teachers
    teachers = [record['teacher'] for record in data]

    try:
        # Get params and throw errors for invalid ones
        teacher = str(post_data['teacher'])
        category = str(post_data['category'])
        amount = int(post_data['amount'])
        if category not in categories:
            raise ValueError 
 
        if teacher in teachers:
            new_amount = 0
            for record in data:
                if record['teacher'] == teacher:
                    new_amount = record[category] + amount
            data_to_return = [row.to_dict() for row in db_client.update_record(teacher, category, new_amount)]
            return jsonify(data_to_return)

        else:
            db_client.insert_record(teacher, amount, category)
            

    except ValueError:
        print('Invalid Amount or Category')
    except KeyError:
        print('Invalid request params')
