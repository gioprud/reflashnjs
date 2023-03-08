from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/my-python-endpoint', methods=['POST'])
def handle_form_submission():
    data = request.json
    name = data['name']
    email = data['email']
    
    # Perform some operations with the data
    
    response_data = {'message': 'Form submitted successfully'}
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)