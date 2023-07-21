@isTest
global class CowinHomeMock implements HttpCalloutMock{
public String body;
    public String locationHeader = '';
    public Integer responseCode;
    public Integer statusCode;  
    
    public CowinHomeMock(Integer code,String body){
        this.statusCode = code;
        this.body = body;
    }
    public HTTPResponse respond(HTTPRequest request) {
        String responseBody = body;
        HttpResponse response = new HttpResponse();
      	response.setBody(this.body);   
	    response.setHeader('Content-Type', 'application/json');
        response.setStatusCode(this.statusCode);
        System.debug('response'+response);
        return response;
    }
}