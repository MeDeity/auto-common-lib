let StorageUtils = {
    /**
     * 创建storage
     */
    create: function(name){
        return storages.create(name);
    },
    /**
     * 移除storge
     */
    remove: function (name) {
        return storages.remove(name);
    },
}

module.exports = StorageUtils;