const { Logger } = require('../config');

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    create(data) {
        return this.model.create(data);
    }

    destroy(id) {
        return this.model.destroy({ where: { id } });
    }

    get(id) {
        return this.model.findByPk(id);
    }
}

module.exports = CrudRepository;
