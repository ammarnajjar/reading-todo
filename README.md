# reading-todo

[![2018-Pipeline](https://github.com/ammarnajjar/reading-todo/workflows/Client/badge.svg)](https://github.com/ammarnajjar/reading-todo/actions)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/ammarnajjar/reading-todo.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/ammarnajjar/reading-todo/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/ammarnajjar/reading-todo.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/ammarnajjar/reading-todo/context:javascript)
[![Maintainability](https://api.codeclimate.com/v1/badges/793469291a411ffc446c/maintainability)](https://codeclimate.com/github/ammarnajjar/reading-todo/maintainability)

An app to manage a reading todo list

It is automatically deployed on [heroku](https://reading-todo.herokuapp.com/)

I am starting this maily for educational purposes.

## Development:

### Build and Run

- Using [Ansible](https://docs.ansible.com/ansible/latest/user_guide/playbooks.html):

  This will create a python3 virtual environment and run ansible playbook inside of it.

  ```bash
  ansible/play ansible/playbook.yml -i ansible/hosts.yml
  ```

- Using [docker-compose](https://docs.docker.com/compose/):

  ```bash
  docker-compose up --build
  ```

- Using [podman-compose](https://github.com/containers/podman-compose):

  ```bash
  sudo podman-compose up --build
  ```

- Using [tilt](https://tilt.dev/):

  - Deploy:

    ```bash
    tilt up --no-browser --hud=false --watch=false
    ```

  - Access to client:

    ```bash
    kubectl port-forward deployment/client 3300:80
    ```

- Using [direnv](https://github.com/direnv/direnv):

  Source the `.envrc` file which adds some scripts to the `PATH`

  ```bash
  ci        # => run ci pipeline

  compose   # => docker-compose locally

  cicd      # => run ci pipeline then compose

  deploy    # => deploy to kubernetes locally
  ```

### Browse the deployment

- Client: [localhost:3100](http://localhost:3100/)
- Docs: [localhost:3200](http://localhost:3200/)
- Prod: [localhost:3300](http://localhost:3300/)
