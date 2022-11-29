<template>
    <form
        class="create-post-form"
        :class="{ 'is-edit': isChangePost }"
        @submit.prevent="submitPostForm"
    >
        <overlay-loading v-if="loading">
            <loader :isActive="loading" />
        </overlay-loading>
        <div class="wrapper-elements-form">
            <div class="image-block">
                <div class="preview-selected-image">
                    <input
                        ref="file"
                        class="input-choose-image"
                        type="file"
                        @change="selectImage"
                        accept="image/*"
                    />
                    <img
                        v-if="previewImage"
                        :src="previewImage"
                        class="selected-image"
                        alt="selected image"
                    />
                    <img
                        v-if="!previewImage && formPost.image"
                        :src="formPost.image"
                        class="selected-image"
                        alt="selected image"
                    />
                    <div
                        v-if="!previewImage && !formPost.image"
                        class="block-select-image"
                    >
                        <icon-upload :width="35" :height="45" />
                        <p class="text">You can select your image for post</p>
                    </div>
                    <button
                        v-if="previewImage"
                        @click.stop.prevent="deleteSelectedImage"
                        class="delete-selected-image"
                    >
                        X
                    </button>
                </div>
            </div>
            <div class="info-block">
                <div class="form-field">
                    <input
                        type="text"
                        tabindex="1"
                        name="title"
                        v-validate="'required|min:3|max:40'"
                        autocomplete="false"
                        v-model.trim="formPost.title"
                        class="title-input"
                    />
                    <div class="label" :class="{ 'has-text': formPost.title }">
                        <div class="label-text">Title</div>
                        <div class="plash"></div>
                    </div>
                    <span
                        v-if="errors.has('title') && !submitted"
                        class="error-message"
                    >
                        {{ errors.first("title") }}
                    </span>
                </div>
                <div class="form-field">
                    <textarea
                        tabindex="2"
                        name="description"
                        v-validate="'required|min:45'"
                        v-model.trim="formPost.description"
                        class="description-input"
                    />
                    <div
                        class="label"
                        :class="{ 'has-text': formPost.description }"
                    >
                        <div class="label-text">Description</div>
                        <div class="plash"></div>
                    </div>
                    <span
                        v-if="errors.has('description') && !submitted"
                        class="error-message"
                    >
                        {{ errors.first("description") }}
                    </span>
                </div>
            </div>
        </div>
        <div class="form-field-row">
            <my-checkbox
                tabindex="3"
                :title="'Private post'"
                v-model="formPost.hidden"
            />
        </div>
        <div class="btn-block">
            <button
                :class="{
                    disabled: errors.has('title') || errors.has('description'),
                }"
                :disabled="errors.has('title') || errors.has('description')"
                tabindex="4"
            >
                {{ isChangePost ? "Edit Post" : "Publish Post" }}
            </button>
        </div>
    </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MyCheckbox from "../common/MyCheckbox.vue";
import IconUpload from "../svg/IconUpload.vue";
import OverlayLoading from "../common/OverlayLoading.vue";
import Loader from "../common/Loader.vue";

export default {
    name: "PostForm",

    components: { MyCheckbox, IconUpload, OverlayLoading, Loader },

    props: {
        isChangePost: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            formPost: {
                title: "",
                image: null,
                description: "",
                hidden: false,
            },
            selectedImage: null,
            previewImage: null,
            submitted: false,
            loading: false,
        };
    },

    computed: {
        ...mapGetters({
            getUser: "auth/getUser",
            currentPost: "post/getCurrentPost",
        }),
    },

    methods: {
        ...mapActions({
            createPost: "post/createPost",
            updatePost: "post/updatePost",
            getUserPosts: "post/getUserPosts",
        }),

        handleCheckboxPublic() {
            this.formPost.public = !this.formPost.public;
        },

        selectImage({ target }) {
            this.selectedImage = target.files.item(0);
            this.previewImage = URL.createObjectURL(this.selectedImage);
        },

        deleteSelectedImage() {
            this.selectedImage = null;
            this.previewImage = null;
        },

        async submitPostForm() {
            this.loading = true;

            if (!this.isChangePost) {
                this.$validator.validateAll().then(async (isValid) => {
                    if (!isValid) {
                        this.loading = false;
                        return;
                    }

                    try {
                        const formData = new FormData();

                        for (let [key, value] of Object.entries(
                            this.formPost
                        )) {
                            if (key !== "image") {
                                formData.append(key, value);
                            } else {
                                formData.append(
                                    key,
                                    this.selectedImage
                                        ? this.selectedImage
                                        : null
                                );
                            }
                        }

                        await this.createPost(formData);
                        await this.getUserPosts();
                    } catch (error) {
                        console.error(error);
                    } finally {
                        this.loading = false;
                        this.formPost.title = "";
                        this.formPost.description = "";
                        this.formPost.image = "";
                        this.formPost.hidden = false;
                        this.submitted = true;

                        this.deleteSelectedImage();
                    }
                });
            } else {
                this.$validator.validateAll().then(async (isValid) => {
                    if (!isValid) {
                        this.loading = false;
                        return;
                    }

                    try {
                        const formData = new FormData();

                        for (let [key, value] of Object.entries(
                            this.formPost
                        )) {
                            if (key !== "image") {
                                formData.append(key, value);
                            } else {
                                formData.append(
                                    key,
                                    this.selectedImage
                                        ? this.selectedImage
                                        : null
                                );

                                formData.append("postId", this.currentPost._id);
                            }
                        }

                        await this.updatePost(formData);

                        this.$emit("formSubmitted");
                    } catch (error) {
                        console.error(error);
                    } finally {
                        this.loading = false;
                        this.deleteSelectedImage();
                    }
                });
            }
        },
    },

    mounted() {
        if (this.isChangePost) {
            this.formPost.title = this.currentPost.title;
            this.formPost.image = this.currentPost.image;
            this.formPost.description = this.currentPost.description;
            this.formPost.hidden = this.currentPost.hidden;
        }
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/mixins.scss";

.create-post-form {
    padding: 20px;
    overflow: hidden;
    border-style: solid;
    background: linear-gradient(#0f172a, #0f172a) padding-box,
        linear-gradient(270deg, #22d3ee 50%, #0ea5e9 100%) border-box;
    border: 1px solid transparent;
    border-radius: 12px;
    transition: all 0.7s;

    @media screen and (max-width: 760px) {
        padding: 20px;
    }

    &.is-edit {
        border-color: $card-color-light;
    }

    .wrapper-elements-form {
        display: flex;
        margin-bottom: 30px;

        @media screen and (max-width: 760px) {
            display: block;
            margin-bottom: 20px;
        }

        .image-block {
            width: 25%;
            min-width: 180px;
            margin-right: 30px;

            @media screen and (max-width: 760px) {
                width: 70%;
                margin: 0 auto;
                height: 200px;
                margin-bottom: 20px;
            }

            @media screen and (max-width: 400px) {
                width: 100%;
            }
        }

        .info-block {
            flex: 1;
        }
    }

    .preview-selected-image {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        outline: 1px solid $card-color-light;
        border-radius: 8px;
        overflow: hidden;

        .block-select-image {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0 8px;
            margin-bottom: 20px;

            .text {
                font-size: 12px;
                line-height: 12px;
                color: $text-color;
                text-align: center;
            }
        }

        .selected-image {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .delete-selected-image {
            position: absolute;
            top: 4px;
            right: 4px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            color: #fff;
            font-size: 12px;
            line-height: 12px;
            background-color: $card-color;

            &:hover {
                transform: scale(1.02);
            }
        }

        .input-choose-image {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
        }
    }

    .form-field-row {
        display: flex;
        align-items: center;
        border: 1px solid $card-color-light;
        border-radius: 6px;
        padding: 10px;
    }

    .form-field {
        position: relative;
        display: flex;
        flex-direction: column-reverse;

        input,
        textarea {
            width: 100%;
            border: 1px solid $card-color-light;
            border-radius: 6px;
            padding: 10px 12px;
            font-size: 16px;
            color: $text-color-light;

            @media screen and (max-width: 760px) {
                font-size: 12px;
            }

            &:focus {
                border-style: solid;
                background: linear-gradient(#0f172a, #0f172a) padding-box,
                    linear-gradient(270deg, #22d3ee 50%, #0ea5e9 100%)
                        border-box;
                border: 1px solid transparent;

                & ~ .label {
                    top: -8px;

                    .label-text {
                        @include linear-background-brand;
                        font-size: 14px;
                    }

                    .plash {
                        opacity: 1;
                    }
                }
            }
        }

        .error-message {
            position: absolute;
            top: -15px;
            right: 5px;
            font-size: 12px;
            line-height: 12px;
            color: $error-color;

            @media screen and (max-width: 760px) {
                font-size: 10px;
                line-height: 12px;
            }
        }

        .label {
            position: absolute;
            top: 10px;
            left: 12px;
            display: block;
            padding: 0 5px;
            transition: 0.3s;
            z-index: 2;

            &.has-text {
                top: -8px;

                .label-text {
                    @include linear-background-brand;
                    font-size: 14px;
                }

                .plash {
                    opacity: 1;
                }
            }

            .label-text {
                font-size: 18px;
                color: $text-color;
                z-index: 3;
                transition: 0.3s;

                @media screen and (max-width: 760px) {
                    font-size: 14px;
                }
            }

            .plash {
                opacity: 0;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                pointer-events: none;
                background-color: $main-color;
                transition: 0.5s;
                z-index: -1;
            }
        }

        &:not(:last-child) {
            margin-bottom: 30px;

            @media screen and (max-width: 760px) {
                margin-bottom: 20px;
            }
        }
    }

    .description-input {
        height: 160px;
        resize: none;

        &::-webkit-scrollbar {
            width: 4px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: $text-gray-color;
            border-radius: 2px;
        }
    }

    .btn-block {
        display: flex;
        justify-content: flex-end;
        margin-top: 30px;

        @media screen and (max-width: 760px) {
            margin-top: 20px;
        }

        button {
            padding: 8px 20px;
            border: 1px solid $card-color-light;
            border-radius: 8px;
            font-size: 18px;
            line-height: 20px;
            color: $text-color;

            @media screen and (max-width: 760px) {
                font-size: 14px;
                line-height: 16px;
            }

            &.disabled {
                pointer-events: none;
            }

            &:hover,
            &:focus {
                color: $brand-color;
                -webkit-box-shadow: inset 0px 0px 6px 0px rgba(14, 165, 233, 1);
                -moz-box-shadow: inset 0px 0px 6px 0px rgba(14, 165, 233, 1);
                box-shadow: inset 0px 0px 6px 0px rgba(14, 165, 233, 1);
                border-style: solid;
                background: linear-gradient(#0f172a, #0f172a) padding-box,
                    linear-gradient(270deg, #22d3ee 50%, #0ea5e9 100%)
                        border-box;
                border: 1px solid transparent;
            }
        }
    }
}
</style>
