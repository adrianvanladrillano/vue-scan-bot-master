<template>
  <div class="about">
    <v-card flat dark class="px-5 py-5 pb-10" style="margin-top: -3px">
      <v-card light>
        <v-list-item two-line>
          <v-list-item-avatar size="64">
            <img
              src="https://scontent.fmnl17-1.fna.fbcdn.net/v/t1.15752-9/172735309_204405848154946_2806401604733415453_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=ae9488&_nc_eui2=AeHe0bVQHWGrmgkGfa2lYGeoWez2rZ9xM-5Z7Patn3Ez7hp14i5kY3YedfaP66GjfMSngpRFLtyqhuZsUN6s5xyd&_nc_ohc=97nlPgf44GYAX8jWALw&_nc_oc=AQmks6-Y5d4aVmgbMmxAQFucNJmauWLBdGt9GewJqSmgsHI_UXKHTVtOWjgG_ue_jM0&_nc_ht=scontent.fmnl17-1.fna&oh=0cc90d6d6b805632757a062879623548&oe=60AA3359"
              alt=""
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="title"
              >John Gerald Espiritu</v-list-item-title
            >
            <v-list-item-subtitle>johnje_etuc@gmail.com</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-actions>
            <div
              style="background: #1e1e1e; border-radius: 50%"
              class="px-2 py-2"
            >
              <v-icon color="white"> mdi-arrow-right </v-icon>
            </div>
          </v-list-item-actions>
        </v-list-item>
      </v-card>
      <v-list subheader three-line>
        <v-subheader>About</v-subheader>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>App Version</v-list-item-title>
            <v-list-item-subtitle>v1.2</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Developed by</v-list-item-title>
            <v-list-item-subtitle>Adrian Van Ladrillano</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list flat subheader three-line>
        <v-subheader>General</v-subheader>

        <v-list-item-group v-model="settings" multiple active-class="">
          <v-list-item>
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox :input-value="active"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Dark Mode</v-list-item-title>
                <v-list-item-subtitle
                  >Notify me about updates to apps or games that I
                  downloaded</v-list-item-subtitle
                >
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-list-item>
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox :input-value="active"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Auto Capture</v-list-item-title>
                <v-list-item-subtitle
                  >Auto-update apps at any time. Data charges may
                  apply</v-list-item-subtitle
                >
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-list-item>
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox :input-value="active"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Auto-add </v-list-item-title>
                <v-list-item-subtitle
                  >Automatically add home screen widgets when downloads
                  complete</v-list-item-subtitle
                >
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <v-card flat class="" style="margin-top: -3px">
      <v-list>
        <v-list-item-group v-model="selectedItem" color="dark">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            link
            :to="item.route"
          >
            <v-list-item-icon>
              <div
                style="background: #1e1e1e; border-radius: 50%"
                class="px-2 py-2"
              >
                <v-icon v-text="item.icon" color="white"></v-icon>
              </div>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <span class="font-weight-medium"> {{ item.text }}</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    selectedItem: 1,
    items: [
      { text: "Help & Support", icon: "mdi-clock", route: "/" },
      { text: "About", icon: "mdi-account", route: "/" },
      { text: "Logout", icon: "mdi-flag", route: "/" }
    ]
  })
};
</script>

        