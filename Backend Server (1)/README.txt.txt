FIRST RUN 
npm install

Then 

npm start


Add product review endpoint 
http://127.0.0.1:5001/addProductReview

add product review post request structure

{
    "code":1234,
    "review":"Totally Recommended"
}

get prediction endpoint
http://127.0.0.1:5001/predict

get prediction post request structure

{
    "code":1234
}

get prediction response sample

{
    "product": 1234,
    "TotalRating": 20,
    "ReviewCount": 4,
    "Average": 5
}
