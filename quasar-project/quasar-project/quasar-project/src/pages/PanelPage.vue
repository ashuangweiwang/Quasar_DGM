	<template v-slot:after>
		<q-bar dense class="bg-grey-4 ">
			<q-space></q-space>
			<q-btn flat dense icon="whatshot" @click="Savedata1"></q-btn>
			<q-btn dense flat icon="minimize"></q-btn>
			<q-btn dense flat icon="close"></q-btn>
		</q-bar>

		<div class="q-pa-md">
			<q-card dense flat>
				<q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary"
					align="justify" narrow-indicator>
					<div>
						<q-tab name="property" label="属性" @click="setProperty" />
					</div>
					<q-tab name="setting" label="设置" @click="setSetting" />
				</q-tabs>
				<q-separator />

			</q-card>
			<q-card dense flat>
				<q-tab-panels v-model="tab" animated>
					<q-tab-panel name="property">
						<div class="text-h6"></div>
						<q-item clickable v-ripple>
							<q-item-section>
								<q-item clickable v-ripple>
									<!-- <span>Name</span> -->
									<q-item-section>名称</q-item-section>
									<q-item-section avatar>
										<div class="cursor-pointer">
											{{ PName }}
											<q-popup-edit v-model="PName" auto-save v-slot="scope">
												<q-input v-model="scope.value" dense autofocus counter
													@keyup.enter="scope.set" />
											</q-popup-edit>
										</div>
									</q-item-section>

								</q-item>
								<q-item clickable v-ripple>
									<q-item-section>ID</q-item-section>
									<q-item-section avatar>
										<div class="cursor-pointer">
											{{ PId }}
											<q-popup-edit v-model="PId" auto-save v-slot="scope">
												<q-input v-model="scope.value" dense autofocus counter
													@keyup.enter="scope.set" />
											</q-popup-edit>
										</div>
									</q-item-section>
								</q-item>
								<q-item clickable v-ripple>
									<q-item-section>类名</q-item-section>
									<q-item-section avatar>
										<div class="cursor-pointer">
											{{ text3 }}
											<q-popup-edit v-model="text3" auto-save v-slot="scope">
												<q-input v-model="scope.value" dense autofocus counter
													@keyup.enter="scope.set" />
											</q-popup-edit>
										</div>
									</q-item-section>
								</q-item>
								<q-item clickable v-ripple>
									<q-item-section>类型</q-item-section>
									<q-item-section avatar>
										<div class="cursor-pointer">
											{{ Type1}}
											<q-popup-edit v-model="Type1" auto-save v-slot="scope">
												<q-input v-model="scope.value" dense autofocus counter
													@keyup.enter="scope.set" />
											</q-popup-edit>
										</div>
									</q-item-section>
								</q-item>
								<q-item clickable v-ripple>
									<q-item-section>投影面</q-item-section>
									<q-item-section avatar>
										<q-btn-dropdown flat color="bg-grey-3" label="Direction">
											<q-list>
												<q-item clickable v-close-popup @click="sliceDirection0">YZ
													<q-item-section>

													</q-item-section>
												</q-item>

												<q-item clickable v-close-popup @click="sliceDirection1">XZ
													<q-item-section>

													</q-item-section>
												</q-item>

												<q-item clickable v-close-popup @click="sliceDirection2">XY
													<q-item-section>

													</q-item-section>
												</q-item>
											</q-list>
										</q-btn-dropdown>
									</q-item-section>
								</q-item>
							</q-item-section>
						</q-item>
						<q-list bordered class="rounded-borders">
							<q-expansion-item expand-separator label="边界">
								<q-card>
									<q-card-section>
										<q-field label="Xmin" stack-label>
											<template v-slot:control>
												<div class="cursor-pointer">
													{{ PXi }}
													<q-popup-edit v-model="PXi" auto-save v-slot="scope">
														<q-input v-model="scope.value" dense autofocus counter
															@keyup.enter="scope.set" />
													</q-popup-edit>
												</div>
											</template>
										</q-field>
										<q-field label="Ymin" stack-label>
											<template v-slot:control>
												<div class="cursor-pointer">
													{{ PYi }}
													<q-popup-edit v-model="PYi" auto-save v-slot="scope">
														<q-input v-model="scope.value" dense autofocus counter
															@keyup.enter="scope.set" />
													</q-popup-edit>
												</div>
											</template>
										</q-field>
										<q-field label="Zmin" stack-label>
											<template v-slot:control>
												<div class="cursor-pointer">
													{{ PZi }}
													<q-popup-edit v-model="PZi" auto-save v-slot="scope">
														<q-input v-model="scope.value" dense autofocus counter
															@keyup.enter="scope.set" />
													</q-popup-edit>
												</div>
											</template>
										</q-field>
										<q-field label="Xmax" stack-label>
											<template v-slot:control>
												<div class="cursor-pointer">
													{{ PXa }}
													<q-popup-edit v-model="PXa" auto-save v-slot="scope">
														<q-input v-model="scope.value" dense autofocus counter
															@keyup.enter="scope.set" />
													</q-popup-edit>
												</div>
											</template>
										</q-field>
										<q-field label="Ymax" stack-label>
											<template v-slot:control>
												<div class="cursor-pointer">
													{{ PYa }}
													<q-popup-edit v-model="PYa" auto-save v-slot="scope">
														<q-input v-model="scope.value" dense autofocus counter
															@keyup.enter="scope.set" />
													</q-popup-edit>
												</div>
											</template>
										</q-field>
										<q-field label="Zmax" stack-label>
											<template v-slot:control>
												<div class="cursor-pointer">
													{{ PZa }}
													<q-popup-edit v-model="PZa" auto-save v-slot="scope">
														<q-input v-model="scope.value" dense autofocus counter
															@keyup.enter="scope.set" />
													</q-popup-edit>
												</div>
											</template>
										</q-field>
										<!-- </q-item-section> -->
									</q-card-section>
								</q-card>
							</q-expansion-item>
						</q-list>
						<q-list bordered class="rounded-borders">
							<q-expansion-item expand-separator label="默认属性">

								<div class="q-pa-md">
									<q-table :rows="rowsPro" row-key="name" />
								</div>
							</q-expansion-item>

						</q-list>
						<q-list bordered class="rounded-borders">
							<q-expansion-item expand-separator label="自定义属性">
								<div class="q-pa-md">
									<q-table :rows="rowsPro" row-key="name" />
								</div>
							</q-expansion-item>
						</q-list>
					</q-tab-panel>
					<q-tab-panel name="setting">
						<div class="text-h6">风格</div>
						<q-item clickable v-ripple>
							<q-item-section>Feature类型</q-item-section>
							<q-item-section avatar>
								<div class="cursor-pointer">
									{{ FeaType}}
									<q-popup-edit v-model="FeaType" auto-save v-slot="scope">
										<q-input v-model="scope.value" dense autofocus counter
											@keyup.enter="scope.set" />
									</q-popup-edit>
								</div>
							</q-item-section>
						</q-item>
						<q-item clickable v-ripple>
							<q-item-section>地质编码</q-item-section>
							<q-item-section avatar>
								<div class="cursor-pointer">
									{{ GeoCode1}}
									<q-popup-edit v-model="GeoCode1" auto-save v-slot="scope">
										<q-input v-model="scope.value" dense autofocus counter
											@keyup.enter="scope.set" />
									</q-popup-edit>
								</div>
							</q-item-section>
						</q-item>
						<q-item clickable v-ripple>
							<q-item-section>FeatureID</q-item-section>
							<q-item-section avatar>
								<div class="cursor-pointer">
									{{ FeaID}}
									<q-popup-edit v-model="FeaID" auto-save v-slot="scope">
										<q-input v-model="scope.value" dense autofocus counter
											@keyup.enter="scope.set" />
									</q-popup-edit>
								</div>
							</q-item-section>
						</q-item>
						<q-item clickable v-ripple>
							<q-item-section>颜色</q-item-section>
							<q-item-section avatar>
								<q-input filled v-model="color" class="my-input">
									<template v-slot:append>
										<q-icon name="colorize" class="cursor-pointer">
											<q-popup-proxy cover transition-show="scale" transition-hide="scale">
												<q-color v-model="color" />
											</q-popup-proxy>
										</q-icon>
									</template>
								</q-input>
							</q-item-section>
						</q-item>
						<q-item clickable v-ripple>
							<q-item-section>大小</q-item-section>
							<q-item-section avatar>
								<div>
									<q-field label="" stack-label>
										<template v-slot:control>
											<q-badge color="secondary">
												{{ standard }} (0 to
												50)
											</q-badge>
											<q-slider v-model="standard" :min="0" :max="50" />
										</template>
									</q-field>
								</div>
							</q-item-section>
						</q-item>
						<q-item clickable v-ripple>
							<q-item-section>上属性</q-item-section>
							<q-item-section avatar>
								<div class="cursor-pointer">
									{{Up}}
									<q-popup-edit v-model="Up" auto-save v-slot="scope">
										<q-input v-model="scope.value" dense autofocus counter
											@keyup.enter="scope.set" />
									</q-popup-edit>
								</div>
							</q-item-section>
						</q-item>
						<q-item clickable v-ripple>
							<q-item-section>下属性</q-item-section>
							<q-item-section avatar>
								<div class="cursor-pointer">
									{{Down}}
									<q-popup-edit v-model="Down" auto-save v-slot="scope">
										<q-input v-model="scope.value" dense autofocus counter
											@keyup.enter="scope.set" />
									</q-popup-edit>
								</div>
							</q-item-section>
						</q-item>


					</q-tab-panel>
				</q-tab-panels>
				<!-- </q-tab-panels> -->

				<q-separator />




			</q-card>


		</div>
	</template>

<script>
import {  ref } from "vue";
export default ({
  setup() {
	var PId=ref("")
	var PName=ref("")
	var Type1=ref("")
	var GeoCode1=ref("")
	var Up=ref("")
	var Down=ref("")
	var PXi=ref("")
	var PYi=ref("")
	var PZi=ref("")
  var PXa=ref("")
	var PZa=ref("")
	var PYa=ref("")
	var FeaType=ref("")
	var tab=ref("")
	var text=ref("")
	var standard=ref("2")


    return {
      PId,
      PName,
      Type1,
      GeoCode1,
      Up,
      Down,
      PXi ,
      PYi,
      PZi,
      PXa,
      PYa,
      PZa,
      FeaType,
      tab ,
      text,
      standard,
    };
  },
});
</script>
