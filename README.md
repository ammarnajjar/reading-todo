# reading-todo

An app to manage a reading todo list

I am starting this maily for educational purposes.

## Development:

### Build and Run

- Using [Ansible](https://docs.ansible.com/ansible/latest/user_guide/playbooks.html):

This will create a python3 virtual environment and run ansible playbook inside of it.

```bash
./ansible.playbook ansible/playbook.yml -i ansible/hosts.yml
```

- Using [docker-compose](https://docs.docker.com/compose/):

```bash
docker-compose up --build
```

### Browse

- Open [http://localhost:3200/](http://localhost:3200/)
