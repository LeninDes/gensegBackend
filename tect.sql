
CREATE TABLE activ (
    id_activ    INTEGER NOT NULL,
    name        VARCHAR(50),
    f_init      DATE,
    f_fin       DATE,
    prjt_idproj INTEGER NOT NULL,
    res_idres   INTEGER NOT NULL
);

ALTER TABLE activ ADD CONSTRAINT activ_pk PRIMARY KEY ( id_activ );

CREATE TABLE datelle_permiso (
    id_dpe          INTEGER NOT NULL,
    roles_id_rol    INTEGER NOT NULL,
    permisos_id_per INTEGER NOT NULL,
    estado          CHAR(1)
);

ALTER TABLE datelle_permiso ADD CONSTRAINT datelle_permiso_pk PRIMARY KEY ( id_dpe );

CREATE TABLE form (
    idf     INTEGER NOT NULL,
    nmform  VARCHAR(50) NOT NULL,
    estado  CHAR(1),
    abr     VARCHAR(20),
    fcreate DATE,
    fupdate DATE
);

ALTER TABLE form ADD CONSTRAINT form_pk PRIMARY KEY ( idf );

CREATE TABLE opcdes (
    prg_idp INTEGER NOT NULL,
    idodes  INTEGER NOT NULL,
    txtopc  VARCHAR(50)
);

ALTER TABLE opcdes ADD CONSTRAINT opcdes_pk PRIMARY KEY ( idodes );

CREATE TABLE opcmul (
    ido     INTEGER NOT NULL,
    prg_idp INTEGER NOT NULL,
    txtopc  VARCHAR(20)
);

ALTER TABLE opcmul ADD CONSTRAINT opcmul_pk PRIMARY KEY ( ido );

CREATE TABLE opcuni (
    iduni   INTEGER NOT NULL,
    txtopc  VARCHAR(50),
    prg_idp INTEGER NOT NULL
);

ALTER TABLE opcuni ADD CONSTRAINT opcuni_pk PRIMARY KEY ( iduni );

CREATE TABLE permisos (
    id_per      INTEGER NOT NULL,
    n_per       VARCHAR(50),
    abreviatura VARCHAR(50)
);

ALTER TABLE permisos ADD CONSTRAINT permisos_pk PRIMARY KEY ( id_per );

CREATE TABLE prg (
    idp      INTEGER NOT NULL,
    form_idf INTEGER NOT NULL,
    nmprg    VARCHAR(50) NOT NULL,
    tipo     VARCHAR(50)
);

ALTER TABLE prg ADD CONSTRAINT prg_pk PRIMARY KEY ( idp );

CREATE TABLE prjt (
    idproj                      INTEGER NOT NULL,
    plan                        VARCHAR(50),
    usuario_dni                 CHAR(8) NOT NULL,
    usuario_roles_id_rol        INTEGER NOT NULL,
    usuario_subunidad_id_subuni INTEGER NOT NULL
);

ALTER TABLE prjt ADD CONSTRAINT prjt_pk PRIMARY KEY ( idproj );

CREATE TABLE res (
    idres    INTEGER NOT NULL,
    form_idf INTEGER NOT NULL,
    f        DATE
);

ALTER TABLE res ADD CONSTRAINT res_pk PRIMARY KEY ( idres );

CREATE TABLE resdate (
    idresdate INTEGER NOT NULL,
    res_idres INTEGER NOT NULL,
    prg_idp   INTEGER NOT NULL,
    resdate   DATE
);

ALTER TABLE resdate ADD CONSTRAINT resdate_pk PRIMARY KEY ( idresdate );

CREATE TABLE resfile (
    idresfile INTEGER NOT NULL,
    res_idres INTEGER NOT NULL,
    prg_idp   INTEGER NOT NULL,
    resfile   VARCHAR(50)
);

ALTER TABLE resfile ADD CONSTRAINT resfile_pk PRIMARY KEY ( idresfile );

CREATE TABLE resod (
    idresdes      INTEGER NOT NULL,
    prg_idp       INTEGER NOT NULL,
    res_idres     INTEGER NOT NULL,
    opcdes_idodes INTEGER NOT NULL
);

ALTER TABLE resod ADD CONSTRAINT resod_pk PRIMARY KEY ( idresdes );

CREATE TABLE resou (
    idresou      INTEGER NOT NULL,
    res_idres    INTEGER NOT NULL,
    prg_idp      INTEGER NOT NULL,
    opcuni_iduni INTEGER NOT NULL
);

ALTER TABLE resou ADD CONSTRAINT resou_pk PRIMARY KEY ( idresou );

CREATE TABLE respom (
    idresom    INTEGER,
    res_idres  INTEGER NOT NULL,
    prg_idp    INTEGER NOT NULL,
    opcmul_ido INTEGER NOT NULL
);

CREATE TABLE restxt (
    idrestxt  INTEGER NOT NULL,
    prg_idp   INTEGER NOT NULL,
    res_idres INTEGER NOT NULL,
    restxt    VARCHAR(50)
);

ALTER TABLE restxt ADD CONSTRAINT restxt_pk PRIMARY KEY ( idrestxt );

CREATE TABLE roles (
    id_rol      INTEGER NOT NULL,
    n_rol       VARCHAR(50),
    abreviatura VARCHAR(50)
);

ALTER TABLE roles ADD CONSTRAINT roles_pk PRIMARY KEY ( id_rol );

CREATE TABLE subunidad (
    id_subuni INTEGER NOT NULL,
    n_subuni  VARCHAR(50),
    abr       VARCHAR(50)
);

ALTER TABLE subunidad ADD CONSTRAINT subunidad_pk PRIMARY KEY ( id_subuni );

CREATE TABLE usuario (
    dni                 CHAR(8) NOT NULL,
    estado              CHAR(1),
    roles_id_rol        INTEGER NOT NULL,
    subunidad_id_subuni INTEGER NOT NULL,
    n_user              VARCHAR(50),
    password            VARCHAR(50)
);

ALTER TABLE usuario
    ADD CONSTRAINT usuario_pk PRIMARY KEY ( dni,
                                            roles_id_rol,
                                            subunidad_id_subuni );

ALTER TABLE activ
    ADD CONSTRAINT activ_prjt_fk FOREIGN KEY ( prjt_idproj )
        REFERENCES prjt ( idproj );

ALTER TABLE activ
    ADD CONSTRAINT activ_res_fk FOREIGN KEY ( res_idres )
        REFERENCES res ( idres );

ALTER TABLE datelle_permiso
    ADD CONSTRAINT datelle_permiso_permisos_fk FOREIGN KEY ( permisos_id_per )
        REFERENCES permisos ( id_per );

ALTER TABLE datelle_permiso
    ADD CONSTRAINT datelle_permiso_roles_fk FOREIGN KEY ( roles_id_rol )
        REFERENCES roles ( id_rol );

ALTER TABLE opcdes
    ADD CONSTRAINT opcdes_prg_fk FOREIGN KEY ( prg_idp )
        REFERENCES prg ( idp );

ALTER TABLE opcmul
    ADD CONSTRAINT opcmul_prg_fk FOREIGN KEY ( prg_idp )
        REFERENCES prg ( idp );

ALTER TABLE opcuni
    ADD CONSTRAINT opcuni_prg_fk FOREIGN KEY ( prg_idp )
        REFERENCES prg ( idp );

ALTER TABLE prg
    ADD CONSTRAINT prg_form_fk FOREIGN KEY ( form_idf )
        REFERENCES form ( idf );

ALTER TABLE prjt
    ADD CONSTRAINT prjt_usuario_fk FOREIGN KEY ( usuario_dni,
                                                 usuario_roles_id_rol,
                                                 usuario_subunidad_id_subuni )
        REFERENCES usuario ( dni,
                             roles_id_rol,
                             subunidad_id_subuni );

ALTER TABLE res
    ADD CONSTRAINT res_form_fk FOREIGN KEY ( form_idf )
        REFERENCES form ( idf );

ALTER TABLE resdate
    ADD CONSTRAINT resdate_prg_fk FOREIGN KEY ( prg_idp )
        REFERENCES prg ( idp );

ALTER TABLE resdate
    ADD CONSTRAINT resdate_res_fk FOREIGN KEY ( res_idres )
        REFERENCES res ( idres );

ALTER TABLE resfile
    ADD CONSTRAINT resfile_prg_fk FOREIGN KEY ( prg_idp )
        REFERENCES prg ( idp );

ALTER TABLE resfile
    ADD CONSTRAINT resfile_res_fk FOREIGN KEY ( res_idres )
        REFERENCES res ( idres );

ALTER TABLE resod
    ADD CONSTRAINT resod_opcdes_fk FOREIGN KEY ( opcdes_idodes )
        REFERENCES opcdes ( idodes );

ALTER TABLE resod
    ADD CONSTRAINT resod_prg_fk FOREIGN KEY ( prg_idp )
        REFERENCES prg ( idp );

ALTER TABLE resod
    ADD CONSTRAINT resod_res_fk FOREIGN KEY ( res_idres )
        REFERENCES res ( idres );

ALTER TABLE resou
    ADD CONSTRAINT resou_opcuni_fk FOREIGN KEY ( opcuni_iduni )
        REFERENCES opcuni ( iduni );

ALTER TABLE resou
    ADD CONSTRAINT resou_prg_fk FOREIGN KEY ( prg_idp )
        REFERENCES prg ( idp );

ALTER TABLE resou
    ADD CONSTRAINT resou_res_fk FOREIGN KEY ( res_idres )
        REFERENCES res ( idres );

ALTER TABLE respom
    ADD CONSTRAINT respom_opcmul_fk FOREIGN KEY ( opcmul_ido )
        REFERENCES opcmul ( ido );

ALTER TABLE respom
    ADD CONSTRAINT respom_prg_fk FOREIGN KEY ( prg_idp )
        REFERENCES prg ( idp );

ALTER TABLE respom
    ADD CONSTRAINT respom_res_fk FOREIGN KEY ( res_idres )
        REFERENCES res ( idres );

ALTER TABLE restxt
    ADD CONSTRAINT restxt_prg_fk FOREIGN KEY ( prg_idp )
        REFERENCES prg ( idp );

ALTER TABLE restxt
    ADD CONSTRAINT restxt_res_fk FOREIGN KEY ( res_idres )
        REFERENCES res ( idres );

ALTER TABLE usuario
    ADD CONSTRAINT usuario_roles_fk FOREIGN KEY ( roles_id_rol )
        REFERENCES roles ( id_rol );

ALTER TABLE usuario
    ADD CONSTRAINT usuario_subunidad_fk FOREIGN KEY ( subunidad_id_subuni )
        REFERENCES subunidad ( id_subuni );
