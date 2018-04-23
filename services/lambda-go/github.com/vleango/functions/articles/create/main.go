package main

import (
	"encoding/json"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/vleango/lib/models"
)

// var (
//  // ErrNameNotProvided is thrown when a name is not provided
//  ErrNameNotProvided = errors.New("no name was provided in the HTTP body")
// )

func Handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {

	if request.HTTPMethod == "OPTIONS" {
		return events.APIGatewayProxyResponse{
			Body:       "",
			StatusCode: 200,
			Headers: map[string]string{
				"Access-Control-Allow-Origin":  "*",
				"Access-Control-Allow-Headers": "Content-Type",
			},
		}, nil
	}

	requestArticle := RequestArticle{}
	json.Unmarshal([]byte(request.Body), &requestArticle)

	item, err := models.ArticleCreate(requestArticle.Article)
	if err != nil {
		return events.APIGatewayProxyResponse{
			Body:       "error",
			StatusCode: 400,
			Headers: map[string]string{
				"Access-Control-Allow-Origin":  "*",
				"Access-Control-Allow-Headers": "Content-Type",
			},
		}, err
	}

	b, err := json.Marshal(item)
	if err != nil {
		return events.APIGatewayProxyResponse{}, err
	}

	return events.APIGatewayProxyResponse{
		Body:       string(b),
		StatusCode: 200,
		Headers:    map[string]string{"Access-Control-Allow-Origin": "*"},
	}, nil
}

func main() {
	lambda.Start(Handler)
}

type RequestArticle struct {
	Article models.Article `json:"article"`
}