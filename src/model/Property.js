export default class Property {
    constructor(id, address, description, areaJsonConfig, type, saleType, informations, userId,createdAt) {
        this.Id = id;
        this.Address = address;
        this.Description = description;
        this.AreaJsonConfig = areaJsonConfig;
        this.Type = type;
        this.SaleType = saleType;
        this.Informations = informations;
        this.UserId = userId;
        this.CreatedAt = createdAt;
    }
    get valid() {
        const errors = [];

        if (this.Address.length < 10 || this.Address.length > 120)
            errors.push('Coloque seu endereço e pesquise para validar no mapa;')
        if (this.Description.length < 5 || this.Description.length > 120)
            errors.push('Descrição deve conter no mímimo 5 e máximo e 20 caracteres;')
        if (!this.AreaJsonConfig)
            errors.push('Valide o endereço pesquisando-o no mapa!')
        if (!this.Informations)
            errors.push('Informações pertinentes à propriedade devem ser informadas!')

        return errors;
    }
}
