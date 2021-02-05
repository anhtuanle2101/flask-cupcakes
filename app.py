"""Flask app for Cupcakes"""
from models import connect_db, Cupcake, db
from flask import Flask, request, jsonify, render_template
from secrets import API_SECRET_KEY, APP_SECRET

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI']='postgres:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
app.config['SQLALCHEMY_ECHO']=True
app.config['SECRET_KEY']=APP_SECRET

connect_db(app)

@app.route('/api/cupcakes')
def get_all_cupcakes():
    cupcakes = Cupcake.query.all()
    response_json = {'cupcakes' : [cupcake.serialize() for cupcake in cupcakes]}
    return jsonify(response_json)

@app.route('/api/cupcakes/<int:cupcake_id>')
def get_cupcake(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    return jsonify({'cupcake': cupcake.serialize()})

@app.route('/api/cupcakes', methods=['POST'])
def create_cupcake():
    flavor = request.json.get('flavor', None)
    size = request.json.get('size', None)
    rating = request.json.get('rating', None)
    image = request.json.get('image', None)
    if (flavor and size and rating):
        cupcake = Cupcake(flavor = flavor, size = size, rating = rating, image = image)
        db.session.add(cupcake)
        db.session.commit()
        return (jsonify({'cupcake': cupcake.serialize()}), 201)
    else:
        return jsonify({'cupcake': 'empty required fields'})

@app.route('/api/cupcakes/<int:cupcake_id>', methods=['PATCH'])
def update_cupcake(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    cupcake.flavor = request.json.get('flavor', cupcake.flavor)
    cupcake.size = request.json.get('size', cupcake.size)
    cupcake.rating = request.json.get('rating', cupcake.rating)
    cupcake.image = request.json.get('image', cupcake.image)
    db.session.commit()
    return (jsonify({'cupcake': cupcake.serialize()}))

@app.route('/api/cupcakes/<int:cupcake_id>', methods=['DELETE'])
def delete_cupcake(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    db.session.delete(cupcake)
    return (jsonify({'message': 'Deleted'}))

@app.route('/api/cupcakes/search')
def search_cupcake():
    term = request.args.get('term', None)
    if (term):
        cupcakes = Cupcake.query.filter(Cupcake.flavor.ilike(f'%{term}%')).all()
        print(cupcakes)
        if (len(cupcakes)>0):
            return (jsonify({'cupcakes':[cupcake.serialize() for cupcake in cupcakes]}))
        else:
            return (jsonify({'message': 'no cupcakes founded'}))
    else:
        return (jsonify({'message': 'term field is empty'}))


@app.route('/')
def index_page():
    return render_template('index.html')


