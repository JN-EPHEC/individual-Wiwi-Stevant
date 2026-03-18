/*
Âge (number) :
    Doit être un nombre valide.
    Si inférieur à 18 ans : Inscription refusée (retourne false), sauf si le rôle est ”stagiaire” (retourne true).
    Si supérieur à 120 ans : Doit lever une erreur (throw new Error("Âge invalide")).
Rôle (string) :
    N’accepte que trois valeurs exactes : ”admin”, ”user”, ou ”stagiaire”.
    Toute autre valeur lève une erreur (throw new Error("Rôle invalide")).
Email (string) :
    Doit obligatoirement contenir un caractère @ et un point ..
    Sinon, retourne false.
*/

export function validateUserRegistration(age : number, role : string, email : string) : boolean {
    if (isNaN(age)) {throw new Error("pas un Number")}
    if (age < 18 && role != "stagiaire") {return false}
    if (age > 120) {throw new Error("Âge invalide")}

    //role
    if (role != "admin" && role != "user" && role != "stagiaire") {throw new Error("Rôle invalide")}
    
    // email
    if (!email.includes("@") || !email.includes(".")) {return false}

    return true
}