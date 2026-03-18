import { validateUserRegistration } from "../../../utils/userValidator";

const validatorTest = [
    // [age, role, email, attendu, description]
    [17, "stagiaire", "test@truc.be", true, "good"],
    [17, "user", "http://@truc", false, "pas de point / pas le bon role (avec age)"],
    [17, "admin", "test.be", false, "pas de @ / pas le bon role (avec age)"],
    [25, "stagiaire", "http://@truc", false, "pas de ."],
    [25, "user", "test.be", false, "pas de @"],
    [25, "admin", "test@truc.be", true, "good"],
    [121, "stagiaire", "test.be", "Âge invalide", "age trop grand"],
    [121, "user", "test@truc.be", "Âge invalide", "age trop grand"],
    [121, "admin", "http://@truc", "Âge invalide", "age trop grand"],
    [25, "bh", "test.be", "Rôle invalide", "pas de @"],
    [NaN, "stagiaire", "test.be", "pas un Number", "NaN / pas de @"],
    [0, "user", "http://@truc", false, "pas de point / pas le bon role (avec age)"],
    [-0, "user", "http://@truc", false, "pas de point / pas le bon role (avec age)"],
    [Number.MAX_SAFE_INTEGER , "user", "http://@truc", "Âge invalide", "pas de point / pas le bon role (avec age)"],
    [Infinity, "user", "http://@truc", "Âge invalide", "pas de point / pas le bon role (avec age)"],
    [undefined, "user", "http://@truc", "pas un Number", "pas un Number"],
    [17, "", "http://@truc", false, "pas de point / pas le bon role (avec age)"],
    [17, "/n", "http://@truc", false, "pas de point / pas le bon role (avec age)"],
    [17, "<script>while(true){console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAA')}</script>", "123", false, "pas de point / pas le bon role (avec age)"],
    [17, "a".repeat(10000) , "true", false, "pas de point / pas le bon role (avec age)"],
];

describe("validateUserRegistration", () => {
    test.each(validatorTest)(
        "%s",
        (age, role, email, attendu, description) => {
            if (typeof attendu === "string") {
                expect(() => validateUserRegistration(age as any, role as any, email as any)).toThrow(attendu);
            } else {
                expect(validateUserRegistration(age as any, role as any, email as any)).toBe(attendu);
            }
        }
    );
});
