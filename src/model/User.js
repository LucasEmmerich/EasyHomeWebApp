export default class User {
    constructor(Id, FirstName, LastName, Email, Contact, Type, Document, Login, Password, ImageUrl) {
        this.Id = Id;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Email = Email;
        this.Contact = Contact;
        this.Type = Type;
        this.Document = Document;
        this.Login = Login;
        this.Password = Password;
        this.ImageUrl = ImageUrl;
    }
    get FullName() {
        return this.FirstName + ' ' + this.LastName;
    }
    get valid() {
        const regexLogin = new RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,19}$/igm);

        const errors = [];

        if ((this.FirstName.length < 2 || this.FirstName.length > 40) || (this.LastName.length < 2 || this.LastName.length > 40))
            errors.push('Primeiro e Último nome devem ter um mínimo de 2(dois) caracters e um máximo de 40.')
        if (this.Email.length < 5 || !this.Email.includes('@', '.'))
            errors.push('Email inválido.')
        if (this.Contact.length !== 10 && this.Contact.length !== 11)
            errors.push('Contato deve ser apenas números e deve ter 10 ou 11 dígitos.')
        if (this.Type === 'Física' && this.Document.length !== 11)
            errors.push('Preencha o CPF corretamente com somente números.')
        if (this.Type === 'Jurídica' && this.Document.length !== 14)
            errors.push('Preencha o CNPJ corretamente com somente números.')
        if (!regexLogin.test(this.Login))
            errors.push('Login deve conter apenas letras, números e .(ponto final) Ex: joao18.easyhome;')
        if (this.Password.length < 6 || this.Password.length > 20)
            errors.push('Senha deve ter mínimo 6 e máximo de 20 caracteres;')

        return errors;
    }
}