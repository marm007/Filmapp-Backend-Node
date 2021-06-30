const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const Thumbnail = require('../thumbnail/model').thumbnailSchema;

const filmSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author_name: {
      type: String,
      required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: Thumbnail,
    meta: {
        views: {
            type: Number,
            default: 0
        }
    }
}, {
    timestamps: true,
});


filmSchema.methods = {
    view(full) {
        let view = {
            title: this.title,
            author_name: this.author_name,
            description: this.description,
            views: this.meta.views,
            thumbnail: this.thumbnail,

        };

        return full ? {
            id: this._id,
            ...view,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        } : view;
    }
};


const model = mongoose.model('Film', filmSchema);

module.exports = {model, filmSchema};
