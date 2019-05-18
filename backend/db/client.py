from .models import RecycledMaterial
from . import db

def get_all_recycling_data():
    return RecycledMaterial.query.all()

def update_record(teacher, category, amount):

    new_data = {}
    new_data[category] = amount
    a = RecycledMaterial.query.filter_by(teacher=teacher)

    record = RecycledMaterial.query.filter_by(teacher=teacher).update(new_data)
    db.session.commit()

    return RecycledMaterial.query.all()