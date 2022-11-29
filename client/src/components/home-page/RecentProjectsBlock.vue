<template>
    <section class="recent-projects-block">
        <h2 class="title">Recent <span class="brand-color">Projects</span></h2>
        <div class="projects-list">
            <div
                class="project-item"
                v-for="(project, index) in projectsList"
                :key="project.id"
            >
                <img
                    src="@/assets/images/projects/project1.png"
                    class="image-project"
                    :alt="project.title"
                />
                <div class="info-block">
                    <div class="project-title">
                        {{ project.title }}
                        <div class="project-type" :class="colorsType[index]">
                            <span>{{ project.type }}</span>
                        </div>
                    </div>
                    <p class="project-description">{{ project.description }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "RecentProjectsBlock",

    data() {
        return {
            projectsList: [
                {
                    id: "1",
                    type: "Web Design",
                    title: "Project 1",
                    urlImage: "",
                    description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Suspendisse bibendum. Nunc non posuere consectetur, justo erat semper enim, non hendrerit dui odio id enim.",
                },
                {
                    id: "2",
                    type: "Next.js",
                    urlImage: "",
                    title: "Project 2",
                    description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Suspendisse bibendum. Nunc non posuere consectetur, justo erat semper enim, non hendrerit dui odio id enim.",
                },
                {
                    id: "3",
                    type: "Awesome feature",
                    urlImage: "",
                    title: "Project 3",
                    description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Suspendisse bibendum. Nunc non posuere consectetur, justo erat semper enim, non hendrerit dui odio id enim.",
                },
            ],

            colorsType: ["green", "red", "blue"],
        };
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";
@import "@/assets/scss/_variables.scss";

.brand-color {
    @include linear-background-brand;
}

.recent-projects-block {
    width: 100%;
    margin-top: 120px;

    @media screen and (max-width: 760px) {
        margin-top: 56px;
    }

    .title {
        @include title-home-page;
    }

    .projects-list {
        margin-top: 70px;

        @media screen and (max-width: 760px) {
            margin-top: 25px;
        }

        .project-item {
            width: 100%;
            display: flex;
            align-items: center;
            border-radius: 20px;
            background-color: $light-main-color;
            padding: 30px;

            @media screen and (max-width: 760px) {
                flex-direction: column;
                text-align: center;
                padding: 10px;
            }

            .image-project {
                display: block;
                width: 200px;
                height: 220px;
                object-fit: contain;

                @media screen and (max-width: 760px) {
                    width: 60px;
                    height: 65px;
                }
            }

            .info-block {
                flex: 1;
                margin-left: 50px;

                @media screen and (max-width: 760px) {
                    margin-left: 0;
                }

                .project-title {
                    display: flex;
                    align-items: center;
                    font-weight: 500;
                    font-size: 26px;
                    line-height: 35px;
                    color: $text-color-light;

                    @media screen and (max-width: 760px) {
                        justify-content: center;
                        font-size: 18px;
                        margin-top: 18px;
                    }

                    .project-type {
                        display: block;
                        margin-left: 30px;
                        font-weight: 700;
                        font-size: 14px;
                        line-height: 16px;
                        padding: 8px;
                        border-radius: 10px;

                        @media screen and (max-width: 760px) {
                            margin-left: 10px;
                        }

                        &.green {
                            background: linear-gradient(
                                180deg,
                                rgba(16, 185, 129, 0.2) 0%,
                                rgba(190, 242, 100, 0.2) 100%
                            );

                            span {
                                background: linear-gradient(
                                    180deg,
                                    #10b981 0%,
                                    #bef264 100%
                                );
                                -webkit-background-clip: text;
                                -webkit-text-fill-color: transparent;
                                background-clip: text;
                                text-fill-color: transparent;
                            }
                        }

                        &.red {
                            background: linear-gradient(
                                180deg,
                                rgba(220, 38, 38, 0.2) 0%,
                                rgba(249, 115, 22, 0.2) 100%
                            );

                            span {
                                background: linear-gradient(
                                    180deg,
                                    #dc2626 0%,
                                    #f97316 100%
                                );
                                -webkit-background-clip: text;
                                -webkit-text-fill-color: transparent;
                                background-clip: text;
                                text-fill-color: transparent;
                            }
                        }

                        &.blue {
                            background: linear-gradient(
                                180deg,
                                rgba(124, 58, 237, 0.2) 0%,
                                rgba(96, 165, 250, 0.2) 100%
                            );

                            span {
                                background: linear-gradient(
                                    180deg,
                                    #7c3aed 0%,
                                    #60a5fa 100%
                                );
                                -webkit-background-clip: text;
                                -webkit-text-fill-color: transparent;
                                background-clip: text;
                                text-fill-color: transparent;
                            }
                        }
                    }
                }

                .project-description {
                    font-weight: 400;
                    font-size: 19px;
                    line-height: 28px;
                    color: $text-color;
                    margin-top: 16px;

                    @media screen and (max-width: 760px) {
                        margin-top: 18px;
                        font-size: 16px;
                    }
                }
            }

            &:not(:last-child) {
                margin-bottom: 40px;

                @media screen and (max-width: 560px) {
                    margin-bottom: 20px;
                }
            }
        }
    }
}
</style>
