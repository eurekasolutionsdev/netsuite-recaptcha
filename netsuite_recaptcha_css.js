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

var CAPTCHA_VERIFICATION_SUITELET_URL = 'https://forms.na1.netsuite.com/app/site/hosting/scriptlet.nl?script=89&deploy=1&compid=TSTDRV262509&h=cd6d5783f52fba53b0f3';

/**
 * Executes when the user clicks the Submit button.
 * @returns {Boolean} True to continue save, false to abort save
 */
function onSubmit() {
	var captchaChallenge = $('#recaptcha_challenge_field').val();
	var captchaResponse = $('#recaptcha_response_field').val();
	
	var isToBeSubmitted = true;
	
	$.ajax({
		url: CAPTCHA_VERIFICATION_SUITELET_URL + '&challenge=' + captchaChallenge + '&response=' + captchaResponse,
		type: 'POST',
		accepts: 'application/json',
		dataType :'json',
		cache: false,
		async: false
	}).done(function(data) {
		if(!data.status.isSuccess) {
			alert('Captcha Verification Failed.');
			Recaptcha.reload();
			isToBeSubmitted = false;
		}
	});
	
	return isToBeSubmitted;
}