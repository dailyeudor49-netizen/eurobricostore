/******************************************************************************/
/**
 @public
 @brief setta il cookie passato come parametro
 @param name Il nome del cookie da salvare
 @param value il contenuto del cookie
 @param expires validità del cookie (in giorni)
 @param path percorso del cookie
 @param domain dominio del cookie
 @param secure indica se deve essere salvato come cookie sicuro
*/
function BS__SetCookie(name, value, expires, path, domain, secure) {
	var today = new Date();
	today.setTime(today.getTime());
	if (expires) {
		expires = expires * 1000 * 60 * 60 * 24;// conversione da giorni a milisecondi
    }
	var expires_date = new Date(today.getTime() + (expires));
	document.cookie = name +"="+ escape(value) +
		(expires ? ";expires="+ expires_date.toGMTString() : "") +
		(path ? ";path="+ path : "") +
		(domain ? ";domain="+ domain : "") +
		((secure) ? ";secure" : "");

}


/**
 @public
 @brief restituisce un array associativo dei parametri in GET della pagina corrente
 @return l'array associativo dei parametri
*/
function BS__ParseGET() {
	var arrPars = [];
	var queryString = "";

	if (document.URL !== undefined) {
		queryString = document.URL.split('?').pop();
	}
	else if (window.location.search !== undefined) {
		queryString = window.location.search;
	}
    queryString = queryString.replace(/&amp;/g, "&");
	if (queryString !== undefined && queryString.length > 0) {
		queryString = queryString.split('&');
        if (queryString !== undefined && queryString.length > 0) {
		    for (var i in queryString) {
                if (!isNaN(i)) {
                    var par = queryString[i].split('=');
                    arrPars[par[0]] = par[1];
                }
		    }
        }
        
	}
	return arrPars;
}


/**
@public
@brief restituisce il nome del dominio; non funziona con ip numerici o localhost
@return il nome del dominio di livello piu' alto
*/
function BS__GetTopLevelDomain() {
	var regexpDomain = /[^\.]+\.[^\.]{2,63}$/;
	return regexpDomain.exec(document.domain);
}
/******************************************************************************/

var g = BS__ParseGET();
var p = 'https:' == document.location.protocol ? 1 : 0;

for (var i in g) {
	if (i == 'tid_bs') {
		BS__SetCookie('tid_bs', g[i], 30, '/', BS__GetTopLevelDomain(), p);
	}
}
