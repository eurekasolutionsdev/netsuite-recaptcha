/* MIT License (MIT)
 * 
 * Copyright (c) 2013 - Benj Sicam
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var CAPTCHA_VERIFICATION_URL = 'https://www.google.com/recaptcha/api/verify';
var CAPTCHA_PRIVATE_KEY = '6Lf1-OASAAAAAFkwdm0fLSAPErgLRw54VzF4aPrO';

/**
 * 
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
function main(request, response) {
	var jsonResponse = new JSONResponse();
	
	try {
		if(request.getMethod() == 'POST') {
			var clientIpAddress = request.getHeader('NS-Client-IP');
			var captchaChallenge = request.getParameter('challenge');
			var captchaResponse = request.getParameter('response');
			
			var postData = {
				privatekey : CAPTCHA_PRIVATE_KEY,
				remoteip : clientIpAddress,
				challenge : captchaChallenge,
				response : captchaResponse
			};
			
			var captchaVerificationResponse = nlapiRequestURL(CAPTCHA_VERIFICATION_URL, postData);
			
			if(captchaVerificationResponse.getCode() != 200 || captchaVerificationResponse.getBody().indexOf('true') == -1) {
				jsonResponse.status.isSuccess = false;
				jsonResponse.status.errorMessage = 'Failed Verification';
			}
		}
	}
	catch (e) {
		jsonResponse.status.isSuccess = false;
		jsonResponse.status.errorMessage = 'An unexpected error has occurred. Error: ' + e.message;
	}
	
	response.setContentType('JSON');
	response.write(JSON.stringify(jsonResponse));
}

/**
 * Encapsulate the JSON Response
 * @returns {JSONResponse} instance of JSONResponse object
 */
function JSONResponse() {
	this.status = {
		isSuccess: true,
		errorMessage: ''
	};
}