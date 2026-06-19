<div className={`my-48`}>
                            <div className="w-full mb-4">
                                <h1 className="m-0">{aboutMeContent["hobbies_header"]}</h1>
                            </div>
                            <div className={`lg:flex gap-5 mb-20`}>
                                {/* info */}
                                <div className={`${currentTheme==="D" ? "bg-stone-700" : "bg-stone-400"} lg:w-1/2 w-full rounded-4xl p-5 text-center ${transitionClasses}`}>
                                    <h5 className="my-0 font-light">{aboutMeContent["hobbies_header1"]}</h5>
                                    <h5 className="mb-5 mt-0 font-medium italic">{aboutMeContent["hobbies_header2"]}</h5>
                                    <div className="grid grid-cols-3 gap-3">
                                        <HobbyButton transitionClasses={transitionClasses} currentTheme={currentTheme} isSelected={selectedHobby===running} onClick={()=>setSelectedHobby(running)} name="Running" className={`h-32 ${currentTheme==="D" ? "bg-stone-600" : "bg-stone-300"} rounded-3xl text-2xl`} voxelJson={running} />
                                        {/* <HobbyButton isSelected={selectedHobby===gaming} onClick={()=>setSelectedHobby(gaming)} name="Gaming" className={`h-32 ${currentTheme==="D" ? "bg-stone-600" : "bg-stone-300"}  rounded-3xl text-2xl`} voxelJson={gaming} /> */}
                                        <HobbyButton transitionClasses={transitionClasses} currentTheme={currentTheme} isSelected={selectedHobby===bouldering} onClick={()=>setSelectedHobby(bouldering)} name="Bouldering" className={`h-32 ${currentTheme==="D" ? "bg-stone-600" : "bg-stone-300"}  rounded-3xl text-2xl`} voxelJson={bouldering} />
                                        <HobbyButton transitionClasses={transitionClasses} currentTheme={currentTheme} isSelected={selectedHobby===gymming} onClick={()=>setSelectedHobby(gymming)} name="Gymming" className={`h-32 ${currentTheme==="D" ? "bg-stone-600" : "bg-stone-300"}  rounded-3xl text-2xl`} voxelJson={gymming} />
                                        <HobbyButton transitionClasses={transitionClasses} currentTheme={currentTheme} isSelected={selectedHobby===speedcubing} onClick={()=>setSelectedHobby(speedcubing)} name="Speedcubing" className={`h-32 ${currentTheme==="D" ? "bg-stone-600" : "bg-stone-300"}  rounded-3xl text-2xl`} voxelJson={speedcubing} />
                                    </div>
                                </div>
                                {/* 3d voxel thing (THREE.JS) */}
                                <div className={`${currentTheme==="D" ? "bg-stone-800" : "bg-stone-300"} lg:w-1/2 h-full rounded-2xl p-4 ${transitionClasses}`}>
                                    {selectedHobby === running && (
                                        <div className="space-y-4">
                                            <p>{hobbies["running"]["bio"]}</p>
                                            <hr/>
                                            <div>
                                                <h5 className="font-bold mb-2">{hobbies["running"]["yearlyProgress"]}</h5>
                                                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                                                    <div className={`p-2 rounded-xl ${currentTheme==="D" ? "bg-stone-700" : "bg-stone-200"}`}>
                                                        <span className="block text-xs opacity-75">{hobbies["running"]["labels"]["distance"]}</span>
                                                        <span className="font-bold">482.5 km</span>
                                                    </div>
                                                    <div className={`p-2 rounded-xl ${currentTheme==="D" ? "bg-stone-700" : "bg-stone-200"}`}>
                                                        <span className="block text-xs opacity-75">{hobbies["running"]["labels"]["runs"]}</span>
                                                        <span className="font-bold">52</span>
                                                    </div>
                                                    <div className={`p-2 rounded-xl ${currentTheme==="D" ? "bg-stone-700" : "bg-stone-200"}`}>
                                                        <span className="block text-xs opacity-75">{hobbies["running"]["labels"]["elevation"]}</span>
                                                        <span className="font-bold">3,420 m</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <h5 className="font-bold mb-2">Personal Bests (PBs)</h5>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {hobbies["running"]["pbs"].map((pb: Record<string, any>, index: number) => (
                                                        <RunningPBDiv
                                                            key={index}
                                                            name={pb.name}
                                                            bgColor={`${currentTheme==="D" ? "bg-taupe-700" : "bg-taupe-400"}`}
                                                            duration={pb.duration}
                                                            transitionClasses={transitionClasses}
                                                            raceName={pb.raceName}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h5 className="font-bold mb-1">{hobbies["running"]["labels"]["shoes"]}</h5>
                                                <p className="text-sm opacity-80">{hobbies["running"]["shoes"]}</p>
                                            </div>
                                        </div>
                                    )}

                                    {selectedHobby === gaming && (
                                        <div className="space-y-4">
                                            <p>{hobbies["gaming"]["bio"]}</p>
                                            <div>
                                                <h5 className="font-bold mb-2">{hobbies["gaming"]["labels"]["rotation"]}</h5>
                                                <div className="flex flex-wrap gap-2">
                                                    {hobbies["gaming"]["rotation"].map((game: Array<string>, idx: number) => (
                                                        <span key={`${game}-${idx}`} className={`px-2.5 py-1 text-xs font-medium rounded-md ${currentTheme==="D" ? "bg-stone-700 text-stone-200" : "bg-stone-200 text-stone-800"}`}>
                                                            {game}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                <div className={`p-3 rounded-xl ${currentTheme==="D" ? "bg-stone-700" : "bg-stone-200"}`}>
                                                    <span className="block text-xs opacity-75">{hobbies["gaming"]["labels"]["genres"]}</span>
                                                    <span className="font-semibold">{hobbies["gaming"]["genres"]}</span>
                                                </div>
                                                <div className={`p-3 rounded-xl ${currentTheme==="D" ? "bg-stone-700" : "bg-stone-200"}`}>
                                                    <span className="block text-xs opacity-75">{hobbies["gaming"]["labels"]["hardware"]}</span>
                                                    <span className="font-semibold">{hobbies["gaming"]["hardware"]}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {selectedHobby === bouldering && (
                                        <div className="space-y-4">
                                            <p>{hobbies["bouldering"]["bio"]}</p>
                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                <div className={`p-3 rounded-xl ${currentTheme==="D" ? "bg-stone-700" : "bg-stone-200"}`}>
                                                    <span className="block text-xs opacity-75">{hobbies["bouldering"]["labels"]["maxGrade"]}</span>
                                                    <span className="font-bold text-lg text-emerald-500">V6 (7A)</span>
                                                </div>
                                                <div className={`p-3 rounded-xl ${currentTheme==="D" ? "bg-stone-700" : "bg-stone-200"}`}>
                                                    <span className="block text-xs opacity-75">{hobbies["bouldering"]["labels"]["comfort"]}</span>
                                                    <span className="font-bold text-lg text-amber-500">V4 - V5</span>
                                                </div>
                                            </div>
                                            <div>
                                                <h5 className="font-bold mb-2">{hobbies["bouldering"]["labels"]["style"]}</h5>
                                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                                                    <div>{hobbies["bouldering"]["styles"]["slab"]}</div>
                                                    <div>{hobbies["bouldering"]["styles"]["overhang"]}</div>
                                                    <div>{hobbies["bouldering"]["styles"]["dynos"]}</div>
                                                    <div>{hobbies["bouldering"]["styles"]["crimps"]}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {selectedHobby === gymming && (
                                        <div className="space-y-4">
                                            <p>{hobbies["gymming"]["bio"]}</p>
                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                <div className={`p-3 rounded-xl ${currentTheme==="D" ? "bg-stone-700" : "bg-stone-200"}`}>
                                                    <span className="block text-xs opacity-75">{hobbies["gymming"]["labels"]["split"]}</span>
                                                    <span className="font-semibold">{hobbies["gymming"]["split"]}</span>
                                                </div>
                                                <div className={`p-3 rounded-xl ${currentTheme==="D" ? "bg-stone-700" : "bg-stone-200"}`}>
                                                    <span className="block text-xs opacity-75">{hobbies["gymming"]["labels"]["goal"]}</span>
                                                    <span className="font-semibold">{hobbies["gymming"]["goal"]}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <h5 className="font-bold mb-2">{hobbies["gymming"]["labels"]["targets"]}</h5>
                                                <div className="space-y-1.5 text-sm">
                                                    {hobbies["gymming"]["exercises"].map((ex: Record<string, any>, idx: number) => (
                                                        <div key={idx} className="flex justify-between border-b border-stone-600/20 pb-1">
                                                            <span>{ex.name}</span>
                                                            <span className="font-mono font-semibold">{ex.weight}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {selectedHobby === speedcubing && (
                                        <div className="space-y-4">
                                            <p>{hobbies["speedcubing"]["bio"]}</p>
                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                <div className={`p-3 rounded-xl ${currentTheme==="D" ? "bg-stone-700" : "bg-stone-200"}`}>
                                                    <span className="block text-xs opacity-75">{hobbies["speedcubing"]["labels"]["method"]}</span>
                                                    <span className="font-semibold">{hobbies["speedcubing"]["method"]}</span>
                                                </div>
                                                <div className={`p-3 rounded-xl ${currentTheme==="D" ? "bg-stone-700" : "bg-stone-200"}`}>
                                                    <span className="block text-xs opacity-75">{hobbies["speedcubing"]["labels"]["cube"]}</span>
                                                    <span className="font-semibold">{hobbies["speedcubing"]["cube"]}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <h5 className="font-bold mb-2">{hobbies["speedcubing"]["labels"]["averages"]}</h5>
                                                <div className="grid grid-cols-2 gap-2 text-center text-sm">
                                                    <div className={`p-2 rounded-lg ${currentTheme==="D" ? "bg-stone-700" : "bg-stone-200"}`}>
                                                        <span className="block text-xs opacity-75">Average of 5 (Ao5)</span>
                                                        <span className="font-mono font-bold text-base">{hobbies["speedcubing"]["ao5"]}</span>
                                                    </div>
                                                    <div className={`p-2 rounded-lg ${currentTheme==="D" ? "bg-stone-700" : "bg-stone-200"}`}>
                                                        <span className="block text-xs opacity-75">Average of 100 (Ao100)</span>
                                                        <span className="font-mono font-bold text-base">{hobbies["speedcubing"]["ao100"]}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* <div className="bg-stone-800 w-full lg:w-1/2 min-h-80 lg:min-h-0 lg:max-h-96 rounded-4xl relative overflow-hidden">
                                    {selectedHobby?.data && (
                                        <Canvas3D voxelJson={selectedHobby} className="absolute inset-0 w-full h-full"/>
                                    )}
                                </div> */}
                            </div>
                        </div>